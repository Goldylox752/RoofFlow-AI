require("dotenv").config();

const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// =========================
// INIT
// =========================
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// =========================
// WEBHOOK (RAW BODY FIRST)
// =========================
app.post(
  "/api/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Stripe signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const email = session.metadata?.email;
        const customerId = session.customer;

        if (!email) return res.json({ received: true });

        // Activate contractor
        await supabase
          .from("contractors")
          .update({
            active: true,
            stripe_customer_id: customerId
          })
          .eq("email", email);

        console.log("✅ Contractor activated:", email);
      }

      return res.json({ received: true });

    } catch (err) {
      console.error("❌ Webhook error:", err.message);
      return res.status(500).json({ error: "Webhook failed" });
    }
  }
);

// =========================
// NORMAL MIDDLEWARE
// =========================
app.use(express.json());

// =========================
// HEALTH
// =========================
app.get("/", (req, res) => {
  res.send("🚀 RoofFlow Backend Running");
});

// =========================
// CREATE STRIPE SESSION
// =========================
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { email } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "RoofFlow Lead System",
            },
            unit_amount: 49700,
            recurring: { interval: "month" }
          },
          quantity: 1
        }
      ],
      metadata: { email },
      success_url: "https://yourdomain.com/success",
      cancel_url: "https://yourdomain.com"
    });

    res.json({ id: session.id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe error" });
  }
});

// =========================
// NEW LEAD ROUTER (IMPORTANT)
// =========================
app.post("/api/new-lead", async (req, res) => {
  try {
    const { name, phone, city, issue } = req.body;

    if (!name || !phone || !city) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Save lead
    const { data: lead } = await supabase
      .from("homeowner_leads")
      .insert([{ name, phone, city, issue }])
      .select()
      .single();

    // Find active contractors
    const { data: contractors } = await supabase
      .from("contractors")
      .select("*")
      .eq("city", city)
      .eq("active", true);

    if (!contractors || contractors.length === 0) {
      return res.json({ success: true, note: "No contractors yet" });
    }

    // Send to ONE contractor
    for (const c of contractors) {

      if (c.leads_received >= c.max_leads) continue;

      // SMS hook
      await fetch(process.env.SMS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: c.phone,
          message: `🔥 New roofing lead\n${city}\n${issue}\n${phone}`
        })
      });

      // Update usage
      await supabase
        .from("contractors")
        .update({
          leads_received: c.leads_received + 1
        })
        .eq("id", c.id);

      break;
    }

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lead routing failed" });
  }
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Running on port ${PORT}`);
});