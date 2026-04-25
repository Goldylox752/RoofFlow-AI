import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_MAP = {
  starter: process.env.STRIPE_PRICE_STARTER,
  growth: process.env.STRIPE_PRICE_GROWTH,
  domination: process.env.STRIPE_PRICE_DOMINATION,
};

export async function POST(req) {
  try {
    const { email, phone, plan, leadScore } = await req.json();

    if (!email || !phone || !plan) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const priceId = PRICE_MAP[plan];

    if (!priceId) {
      return Response.json(
        { error: "Invalid pricing plan selected" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],

      customer_email: email,

      metadata: {
        phone,
        plan,
        leadScore: String(leadScore || 0),
      },

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/apply`,
    });

    return Response.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    return Response.json(
      {
        error: error.message || "Checkout failed",
      },
      {
        status: 500,
      }
    );
  }
}