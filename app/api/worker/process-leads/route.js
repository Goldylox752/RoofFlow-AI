import { getQueuedLeads } from "@/lib/queueLead";
import { aiScoreLead } from "@/lib/aiScoreLead";

export async function GET() {
  const leads = getQueuedLeads();

  if (!leads.length) {
    return Response.json({ message: "No leads" });
  }

  const results = [];

  for (const lead of leads) {
    try {
      const scored = await aiScoreLead(lead);
      results.push(scored);
    } catch (err) {
      console.error("AI worker failed:", err.message);
    }
  }

  return Response.json({ processed: results.length });
}
