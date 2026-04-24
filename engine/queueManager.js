import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/* =========================
   OS BRAIN ENTRY POINT
========================= */
export async function runQueueBrain(org_id) {
  const lockKey = `queue_lock_${org_id}`;

  try {
    const locked = await acquireLock(lockKey);
    if (!locked) return;

    const { data: rules } = await supabase
      .from("routing_rules")
      .select("*")
      .eq("org_id", org_id)
      .maybeSingle();

    const routing = rules || {
      mode: "round_robin",
      priority_boost: true
    };

    const { data: leads } = await supabase
      .from("lead_queue")
      .select("*")
      .eq("org_id", org_id)
      .eq("status", "queued")
      .order("priority", { ascending: false })
      .limit(25);

    if (!leads?.length) return releaseLock(lockKey);

    const { data: agents } = await supabase
      .from("agents")
      .select("*")
      .eq("org_id", org_id)
      .eq("status", "online");

    if (!agents?.length) return releaseLock(lockKey);

    for (const lead of leads) {
      const agent = pickBestAgent(agents, routing);

      if (!agent) continue;
      if (agent.active_leads >= agent.capacity) continue;

      await assignLead({ lead, agent, org_id, routing });
    }

  } catch (err) {
    console.error("OS BRAIN ERROR:", err);
  } finally {
    await releaseLock(lockKey);
  }
}

/* =========================
   AGENT SELECTION
========================= */
function pickBestAgent(agents, routing) {
  return agents
    .map(a => ({
      ...a,
      score: computeAgentScore(a, routing)
    }))
    .sort((a, b) => b.score - a.score)[0];
}

function computeAgentScore(agent, routing) {
  const capacityScore = (agent.capacity - agent.active_leads) * 10;
  const loadPenalty = agent.active_leads * 5;

  const speedBonus =
    routing.mode === "ai_priority"
      ? agent.avg_response_speed || 0
      : 0;

  return capacityScore + speedBonus - loadPenalty;
}

/* =========================
   LEAD ASSIGNMENT
========================= */
async function assignLead({ lead, agent, org_id, routing }) {
  const { error } = await supabase
    .from("lead_queue")
    .update({
      status: "processing",
      assigned_agent_id: agent.id
    })
    .eq("id", lead.id)
    .eq("status", "queued");

  if (error) return;

  await supabase.from("assignment_history").insert({
    org_id,
    lead_id: lead.lead_id,
    agent_id: agent.id,
    method: routing.mode,
    created_at: new Date().toISOString()
  });

  await supabase.from("events").insert({
    type: "lead_assigned",
    org_id,
    payload: {
      lead_id: lead.lead_id,
      agent_id: agent.id
    }
  });

  console.log(`🔥 ROUTED: ${lead.lead_id} → ${agent.name}`);
}

/* =========================
   SAFE LOCK SYSTEM (FIXED)
========================= */
async function acquireLock(key) {
  const { data } = await supabase
    .from("locks")
    .insert({ key })
    .select()
    .maybeSingle();

  return !!data;
}

async function releaseLock(key) {
  await supabase.from("locks").delete().eq("key", key);
}