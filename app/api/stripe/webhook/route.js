import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return Response.json({ error: "Invalid webhook" }, { status: 400 });
  }

  // =========================
  // 💰 PAYMENT SUCCESS
  // =========================
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session?.metadata?.userId;
    const plan = session?.metadata?.plan;

    if (!userId) {
      return Response.json({ error: "Missing userId" }, { status: 400 });
    }

    const role =
      plan === "domination"
        ? "domination"
        : plan === "growth"
        ? "growth"
        : "starter";

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_status: "active",
        role,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
      })
      .eq("id", userId);

    if (error) {
      console.error("Supabase update error:", error.message);
    }
  }

  // =========================
  // ❌ SUB CANCELLED
  // =========================
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object;

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_status: "inactive",
        role: "buyer",
      })
      .eq("stripe_subscription_id", sub.id);

    if (error) {
      console.error("Subscription delete error:", error.message);
    }
  }

  return Response.json({ received: true });
}