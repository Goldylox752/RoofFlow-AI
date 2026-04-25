"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then(setLeads);
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>RoofFlow Dashboard</h1>

      <h3>Active Leads</h3>

      {leads.map((l) => (
        <div key={l.id} style={{ marginBottom: 10 }}>
          <b>{l.email}</b> — {l.status} — {l.stage}
        </div>
      ))}
    </div>
  );
}
