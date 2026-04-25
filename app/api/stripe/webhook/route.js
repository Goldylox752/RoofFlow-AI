import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { sendSMS } from "@/lib/sendSMS";
import { enqueueLead } from "@/lib/queueLead";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key);
}

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details?.email;
    const phone = session.metadata?.phone;

    const supabase = getSupabase();

    // 🟢 DB update (safe)
    if (supabase && email) {
      await supabase
        .from("leads")
        .update({ status: "active" })
        .eq("email", email);
    }

    // 📲 SMS (safe wrapped)
    if (phone) {
      try {
        await sendSMS(phone, "RoofFlow Approved 🎉 Book onboarding: https://calendly.com/...");
      } catch (e) {
        console.error("SMS failed:", e.message);
      }
    }

    // 🟡 AI moved to queue (NOT executed here)
    enqueueLead(session.metadata);
  }

  return new Response("OK");
}
