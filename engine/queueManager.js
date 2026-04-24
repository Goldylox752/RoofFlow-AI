// /engine/queueManager.js

/**
 * Queue Manager (Call Center OS Core Brain)
 * Handles queue state, scoring, and assignment readiness
 */

export async function buildQueue({ supabase, org_id }) {

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .eq("org_id", org_id)
    .in("status", ["new", "unassigned"])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Queue fetch error:", error);
    return [];
  }

  return leads.map(scoreLead);
}


/**
 * Lead scoring engine (simple V1 logic)
 */
function scoreLead(lead) {
  let score = 0;

  // urgency signals
  if (lead.city) score += 10;
  if (lead.source === "ads") score += 5;

  // recency boost
  const ageMinutes =
    (Date.now() - new Date(lead.created_at).getTime()) / 60000;

  if (ageMinutes < 10) score += 20;
  else if (ageMinutes < 60) score += 10;

  return {
    ...lead,
    score
  };
}


/**
 * Pick best agent for assignment
 */
export async function getBestAgent({ supabase, org_id }) {

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("org_id", org_id)
    .eq("active", true);

  if (!agents || agents.length === 0) return null;

  // load balancing logic
  const sorted = agents.sort((a, b) => {
    return a.active_leads - b.active_leads;
  });

  return sorted[0];
}


/**
 * Lock assignment (prevents double booking)
 */
export async function lockAssignment({
  supabase,
  lead_id,
  agent_id,
  org_id
}) {

  const { error } = await supabase
    .from("assignments")
    .insert({
      lead_id,
      agent_id,
      org_id,
      status: "locked",
      created_at: new Date().toISOString()
    });

  if (error) {
    console.error("Assignment lock failed:", error);
    return false;
  }

  // update lead state
  await supabase
    .from("leads")
    .update({
      status: "assigned",
      assigned_at: new Date().toISOString()
    })
    .eq("id", lead_id);

  return true;
}


/**
 * FULL QUEUE PROCESSOR (MAIN ENTRY)
 */
export async function processQueue({ supabase, org_id }) {

  const queue = await buildQueue({ supabase, org_id });
  const agent = await getBestAgent({ supabase, org_id });

  if (!agent || queue.length === 0) {
    return { assigned: false };
  }

  const lead = queue[0]; // highest priority

  const locked = await lockAssignment({
    supabase,
    lead_id: lead.id,
    agent_id: agent.id,
    org_id
  });

  if (!locked) {
    return { assigned: false };
  }

  return {
    assigned: true,
    lead,
    agent
  };
}