import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  starter: {
    amount: 9900, // $99
    name: "RoofFlow Starter",
  },
  growth: {
    amount: 19900, // $199
    name: "RoofFlow Growth",
  },
  domination: {
    amount: 39900, // $399
    name: "RoofFlow Domination",
  },
};

export async function POST(req) {
  try {
    const { plan, email, phone } = await req.json();

    if (!PRICES[plan]) {
      return Response.json({ error: "Invalid plan" }, { status: 400 });
    }

    const selected = PRICES[plan];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: selected.name,
            },
            unit_amount: selected.amount,
          },
          quantity: 1,
        },
      ],

      // 🔥 THIS IS WHAT CONNECTS EVERYTHING
      metadata: {
        plan,
        email: email || "",
        phone: phone || "",
      },

      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/apply`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}
