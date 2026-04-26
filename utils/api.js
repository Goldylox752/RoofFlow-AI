// ===============================
// 🌐 FLOW OS API CLIENT (SINGLE FILE)
// ===============================

const FLOW_API =
  process.env.NEXT_PUBLIC_FLOW_API ||
  "https://northsky-flow-os.onrender.com";


// ===============================
// 🔧 CORE REQUEST ENGINE
// ===============================
async function request(url, options = {}) {
  try {
    const res = await fetch(`${FLOW_API}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data?.error || `HTTP ${res.status}`,
      };
    }

    return {
      success: true,
      data,
    };

  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}


// ===============================
// 📩 LEADS
// ===============================
export const createLead = (data) =>
  request("/api/leads", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getLeads = () =>
  request("/api/leads");


// ===============================
// 🧾 JOBS
// ===============================
export const createJob = (data) =>
  request("/api/jobs", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getJobs = () =>
  request("/api/jobs");


// ===============================
// 💰 QUOTES
// ===============================
export const createQuote = (data) =>
  request("/api/quotes", {
    method: "POST",
    body: JSON.stringify(data),
  });