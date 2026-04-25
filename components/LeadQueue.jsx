import { useState } from "react";
import LeadCard from "./LeadCard";

export default function LeadQueue({ leads, setLeads }) {
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");

  async function updateStatus(id, status) {
    setError("");
    setLoadingId(id);

    // 🔥 Optimistic update
    const prevState = leads;

    setLeads((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status } : l
      )
    );

    try {
      const res = await fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update lead");
      }
    } catch (err) {
      // 🔥 rollback on failure
      setLeads(prevState);
      setError("Failed to update lead. Try again.");
    }

    setLoadingId(null);
  }

  return (
    <div style={styles.queue}>
      {error && <p style={styles.error}>{error}</p>}

      {leads.length === 0 && (
        <p style={styles.empty}>No assigned leads yet...</p>
      )}

      {leads.map((item) => (
        <LeadCard
          key={item.id}
          lead={item.lead}
          status={item.status}
          loading={loadingId === item.id}
          onAccept={() => updateStatus(item.id, "accepted")}
          onReject={() => updateStatus(item.id, "rejected")}
        />
      ))}
    </div>
  );
}

const styles = {
  queue: {
    display: "grid",
    gap: 12,
  },

  empty: {
    opacity: 0.7,
  },

  error: {
    color: "#ff6b6b",
    fontSize: 13,
  },
};
