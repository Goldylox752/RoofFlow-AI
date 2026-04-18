/* ===============================
   ROOF FLOW AI CORE ENGINE
   Funnel → Tracking → Drone Redirect
   =============================== */

const CONFIG = {
  SUPABASE_URL: "YOUR_SUPABASE_URL",
  SUPABASE_KEY: "YOUR_SUPABASE_ANON_KEY",
  DRONE_URL: "https://northsky-drones.vercel.app"
};

let supabase = null;

/* ================= INIT ================= */
function initSupabase() {
  if (!window.supabase) return;

  supabase = window.supabase.createClient(
    CONFIG.SUPABASE_URL,
    CONFIG.SUPABASE_KEY
  );

  console.log("✅ Supabase connected");
}
initSupabase();

/* ================= SESSION ================= */
function getSessionId() {
  let id = localStorage.getItem("session_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("session_id", id);
  }

  return id;
}

/* ================= ATTRIBUTION ================= */
function getAttribution() {
  const p = new URLSearchParams(window.location.search);

  return {
    utm_source: p.get("utm_source") || "direct",
    utm_campaign: p.get("utm_campaign") || "organic",
    utm_content: p.get("utm_content") || "",
    cpc: parseFloat(p.get("cpc") || "0")
  };
}

/* ================= TRACKING CORE ================= */
async function track(event, meta = {}) {
  if (!supabase) return;

  try {
    await supabase.from("events").insert([
      {
        event,
        meta: {
          ...meta,
          session_id: getSessionId(),
          url: location.href,
          referrer: document.referrer || "direct"
        },
        created_at: new Date().toISOString()
      }
    ]);
  } catch (e) {
    console.warn("Tracking failed:", e.message);
  }
}

/* ================= LEAD CAPTURE ================= */
async function submitLead() {
  const name = document.getElementById("name")?.value?.trim();
  const email = document.getElementById("email")?.value?.trim();
  const city = document.getElementById("city")?.value?.trim();

  if (!name || !email || !city) {
    alert("Please complete all fields");
    return;
  }

  const session_id = getSessionId();
  const utm = getAttribution();

  await track("lead_capture", { name, email, city, ...utm });

  if (supabase) {
    await supabase.from("leads").insert([
      {
        name,
        email,
        city,
        session_id,
        utm_source: utm.utm_source,
        utm_campaign: utm.utm_campaign,
        created_at: new Date().toISOString()
      }
    ]);
  }

  console.log("✅ Lead stored");

  setTimeout(() => redirectToDrone(), 700);
}

/* ================= DRONE FUNNEL HANDOFF ================= */
function redirectToDrone() {
  const utm = getAttribution();

  const url = new URL(CONFIG.DRONE_URL);

  url.searchParams.set("session_id", getSessionId());
  url.searchParams.set("utm_source", utm.utm_source);
  url.searchParams.set("utm_campaign", utm.utm_campaign);
  url.searchParams.set("utm_content", utm.utm_content);
  url.searchParams.set("from", "roofflow");

  track("funnel_bridge_click", {
    destination: "drone_funnel",
    ...utm
  });

  window.location.href = url.toString();
}

/* ================= PAGE LOAD ================= */
window.addEventListener("load", () => {
  const utm = getAttribution();

  track("page_view", {
    source: utm.utm_source
  });

  console.log("🚀 RoofFlow AI live", utm);
});