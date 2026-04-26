import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const body = await req.json();

  const { lead_id, assigned_to, status = "pending" } = body;

  const { data, error } = await supabase
    .from("jobs")
    .insert([{ lead_id, assigned_to, status }])
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ job: data });
}

export async function GET() {
  const { data } = await supabase.from("jobs").select("*");
  return Response.json({ jobs: data });
}