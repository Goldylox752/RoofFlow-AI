import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "RoofFlow Lead Access"
          },
          unit_amount: 100000
        },
        quantity: 1
      }
    ],
    success_url: "https://your-domain.com/success",
    cancel_url: "https://your-domain.com/cancel"
  });

  return NextResponse.json({ url: session.url });
}
