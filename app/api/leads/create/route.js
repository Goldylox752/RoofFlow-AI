import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      city,
      zip,
      source = "website",
    } = body;

    // 🔐 basic validation
    if (!phone) {
      return Response.json(
        { error: "Phone is required" },
        { status: 400 }
      );
    }

    // 🧠 simple lead scoring (you can improve later)
    let lead_score = 0;
    if (email) lead_score += 40;
    if (phone) lead_score += 30;
    if (zip) lead_score += 30;

    // 💾 SAVE TO SUPABASE (this is the key part)
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
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return Response.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    // ✅ response back to frontend
    return Response.json({
      success: true,
      lead: data,
    });
  } catch (err) {
    console.error("Server error:", err);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
