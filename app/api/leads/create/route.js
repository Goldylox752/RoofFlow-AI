import { supabase } from "@/lib/supabase";
import { geoEngine } from "@/lib/geoEngine";
import { sendSMS } from "@/lib/sms/sendSMS";

export const runtime = "nodejs";

// ===============================
// CREATE LEAD + STRIPE GATE + SMS
// ===============================
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      city = "",
      zip = "",
      source = "website",
    } = body;

    if (!phone) {
      return Response.json(
        { error: "Phone required" },
        { status: 400 }
      );
    }

    // ===============================
    // 🔐 STRIPE SUBSCRIPTION CHECK
    // ===============================
    const userEmail = req.headers.get("x-user-email");

    if (!userEmail) {
      return Response.json(
        { error: "Missing user email" },
        { status: 401 }
      );
    }

    const { data: subscriber, error: subError } = await supabase
      .from("subscribers")
      .select("status")
      .eq("email", userEmail)
      .single();

    if (subError || subscriber?.status !== "active") {
      return Response.json(
        { error: "Subscription required" },
        { status: 403 }
      );
    }

    // ===============================
    // 🧠 LEAD SCORING ENGINE
    // ===============================
    let lead_score = 0;
    if (email) lead_score += 40;
    if (phone) lead_score += 30;
    if (zip) lead_score += 30;

    const { region, priority } = geoEngine({
      city,
      zip,
      lead_score,
    });

    // ===============================
    // 💾 SAVE LEAD
    // ===============================
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          phone,
          city,
          zip,
          source,
          lead_score,
          status: "new",
          geo_region: region,
          priority,
          sms_stage: "none",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // ===============================
    // 📲 SMS TRIGGER (INSTANT)
    // ===============================
    try {
      await sendSMS(
        phone,
        "RoofFlow: You're pre-qualified. We’ll contact you shortly."
      );

      await supabase
        .from("leads")
        .update({ sms_stage: "instant_sent" })
        .eq("id", data.id);
    } catch (smsErr) {
      console.error("SMS failed:", smsErr.message);
    }

    return Response.json({
      success: true,
      lead: data,
    });

  } catch (err) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}