import { stripe } from "../lib/stripe";
import { supabase } from "../lib/supabase";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const rawBody = await buffer(req);

    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.metadata?.email;

      if (!email) return res.status(200).json({ ok: true });

      const { data: existing } = await supabase
        .from("tenants")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("tenants")
          .update({
            status: "active",
            stripe_customer_id: session.customer,
          })
          .eq("email", email);
      } else {
        await supabase.from("tenants").insert([
          {
            email,
            stripe_customer_id: session.customer,
            plan: "growth",
            status: "active",
          },
        ]);
      }
    }

    return res.status(200).json({ received: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Webhook failed" });
  }
}