import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // =========================
  // PAYMENT SUCCESS
  // =========================
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details?.email;
    const plan = session.metadata?.plan || "starter";
    const customerId = session.customer;

    if (!email || !customerId) {
      console.log("❌ Missing email or customer");
      return res.status(200).json({ received: true });
    }

    // =========================
    // 1. UPSERT USER (SAFE)
    // =========================
    const { data: user } = await supabase
      .from("users")
      .upsert(
        {
          email,
          paid: true,
          plan,
          stripe_customer: customerId
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    // =========================
    // 2. CREATE ORG (ONLY ONCE)
    // =========================
    const { data: existingOrg } = await supabase
      .from("organizations")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (!existingOrg) {
      await supabase.from("organizations").insert({
        email,
        plan,
        stripe_customer: customerId,
        status: "active"
      });

      console.log("🏢 Org created for:", email);
    } else {
      console.log("🏢 Org already exists:", email);
    }

    console.log("✅ User unlocked:", email);
  }

  res.json({ received: true });
}