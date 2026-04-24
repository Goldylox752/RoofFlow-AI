import { createClient } from "@supabase/supabase-js";
import { assignLead } from "../../engine/assignLead";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, city, source } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // 1. insert lead
  const { data: lead, error } = await supabase
    .from("leads")
    .insert({
      name,
      phone,
      city,
      source: source || "web",
      status: "new",
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error });
  }

  // 2. assign immediately
  const agent = await assignLead(lead);

  // 3. push realtime update
  await supabase.channel("queue_updates").send({
    type: "broadcast",
    event: "lead_assigned",
    payload: {
      lead,
      agent
    }
  });

  return res.json({
    success: true,
    lead,
    assigned_to: agent.name
  });
}