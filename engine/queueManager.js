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
    // 1. GLOBAL QUEUE LOCK (prevents double runs)
    const locked = await acquireLock(lockKey);
    if (!locked) return;

    // 2. LOAD ROUTING CONFIG
    const { data: rules } = await supabase
      .from("routing_rules")
      .select("*")
      .eq("org_id", org_id)
      .maybeSingle();

    const routing = rules || {
      mode: "round_robin",
      priority_boost: true
    };

    // 3. FETCH QUEUED LEADS (PRIORITY SORTED)
    const { data: leads } = await supabase
      .from("lead_queue")
      .select("*")
      .eq("org_id", org_id)
      .eq("status", "queued")
      .order("priority", { ascending: false })
      .limit(25);

    if (!leads?.length) return releaseLock(lockKey);

    // 4. FETCH AGENTS
    const { data: agents } = await supabase
      .from("agents")
      .select("*")
      .eq("org_id", org_id)
      .eq("status", "online");

    if (!agents?.length) return releaseLock(lockKey);

    // 5. PROCESS LEADS
    for (const lead of leads) {
      const agent = pickBestAgent(agents, routing);

      if (!agent) continue;

      if (agent.active_leads >= agent.capacity) continue;

      await assignLead({
        lead,
        agent,
        org_id,
        routing
      });
    }

  } catch (err) {
    console.error("OS BRAIN ERROR:", err);
  } finally {
    await releaseLock(lockKey);
  }
}

/* =========================
   INTELLIGENT AGENT SCORING
========================= */
function pickBestAgent(agents, routing) {
  return agents
    .map(agent => ({
      ...agent,
      score: computeAgentScore(agent, routing)
    }))
    .sort((a, b) => b.score - a.score)[0];
}

/* =========================
   AGENT SCORING ENGINE
========================= */
function computeAgentScore(agent, routing) {
  const capacityScore = (agent.capacity - agent.active_leads) * 10;

  const speedBonus =
    routing.mode === "ai_priority"
      ? agent.avg_response_speed || 1
      : 0;

  const loadPenalty = agent.active_leads * 5;

  return capacityScore + speedBonus - loadPenalty;
}

/* =========================
   LEAD ASSIGNMENT (ATOMIC STATE)
========================= */
async function assignLead({ lead, agent, org_id, routing }) {
  // 1. LOCK LEAD (prevents duplicate assignment)
  const { error: lockError } = await supabase
    .from("lead_queue")
    .update({ status: "processing" })
    .eq("id", lead.id)
    .eq("status", "queued");

  if (lockError) return;

  // 2. ASSIGN LEAD
  await supabase
    .from("lead_queue")
    .update({
      status: "assigned",
      assigned_agent_id: agent.id
    })
    .eq("id", lead.id);

  // 3. UPDATE AGENT LOAD
  await supabase
    .from("agents")
    .update({
      active_leads: agent.active_leads + 1
    })
    .eq("id", agent.id);

  // 4. HISTORY LOG
  await supabase.from("assignment_history").insert({
    org_id,
    lead_id: lead.lead_id,
    agent_id: agent.id,
    method: routing.mode,
    created_at: new Date().toISOString()
  });

  // 5. REALTIME EVENT STREAM
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
   SIMPLE LOCK SYSTEM
========================= */
async function acquireLock(key) {
  const { data } = await supabase
    .from("locks")
    .insert({ key, created_at: new Date().toISOString() })
    .select()
    .maybeSingle();

  return !!data;
}

async function releaseLock(key) {
  await supabase.from("locks").delete().eq("key", key);
}