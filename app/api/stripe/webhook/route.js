import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===============================
// STRIPE WEBHOOK
// ===============================
export async function POST(req) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    // Verify webhook signature (IMPORTANT)
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return new Response(`Webhook Error: ${err.message}`, {
        status: 400,
      });
    }

    // ===============================
    // PAYMENT SUCCESS
    // ===============================
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const email = session.customer_details?.email;
      const customerId = session.customer;
      const subscriptionId = session.subscription;

      if (!email) {
        return Response.json({ error: "No email found" }, { status: 400 });
      }

      // ===============================
      // ACTIVATE USER IN SUPABASE
      // ===============================
      const { error } = await supabase
        .from("subscribers")
        .upsert([
          {
            email,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: "active",
          },
        ]);

      if (error) {
        console.error("Supabase error:", error.message);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}