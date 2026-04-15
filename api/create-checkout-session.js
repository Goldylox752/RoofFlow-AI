import { stripe } from "../lib/stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "NorthSky AI Roofing Leads",
            },
            unit_amount: 49700,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: { email },
      success_url: "https://northskyflowai.vercel.app/success",
      cancel_url: "https://northskyflowai.vercel.app/cancel",
    });

    return res.status(200).json({ id: session.id });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Checkout failed" });
  }
}