# RoofFlow OS

**RoofFlow OS is a real-time roofing job booking + call center automation engine.**  
It replaces lead marketplaces with a deterministic booking system that routes, qualifies, and assigns jobs to agents automatically.

---

## 🧠 System Overview

RoofFlow OS is built around a single core concept:

> **Leads are not stored — they are processed into booked jobs via a queue engine.**

The system handles:

- Job intake → queue
- Lead qualification
- Agent assignment
- Call lifecycle tracking
- Stripe-based plan activation
- Real-time event streaming

---

## ⚙️ Core Architecture

/engine
osBrain.js          → Main queue engine (single source of truth)
planRules.js        → Stripe → Plan mapping layer

/lifecycle
callLifecycle.js    → Call state machine (calling → booked → closed)

/lib
supabaseClient.js   → Database connection

/api
stripe-webhook.js   → Payment → OS provisioning

/public
index.html          → Frontend funnel


---

## 🧠 OS Brain (Core Engine)

The OS Brain is the only system allowed to:

- Process queue items
- Assign agents
- Update lead status
- Trigger lifecycle events

It ensures:

- No duplicate assignments
- No race conditions
- No double processing

---

## 🔁 Queue Flow

1. Lead enters `lead_queue`
2. OS Brain fetches queued leads
3. Agents are ranked by capacity + load
4. Lead is assigned to best available agent
5. Call lifecycle begins
6. Event is logged in real-time stream

---

## 📞 Call Lifecycle System

Call states:

- `queued`
- `assigned`
- `calling`
- `booked`
- `no_answer`
- `closed`

Each transition is logged in:

- `call_logs`
- `events`

This enables full audit tracking of every job.

---

## 💳 Stripe Plan System

Plans are controlled by a single truth layer:

| Plan   | Agents | Leads/Day | Priority |
|--------|--------|-----------|----------|
| Starter | 1      | 20        | 3        |
| Pro     | 5      | 100       | 2        |
| Elite   | 20     | 999       | 1        |

Stripe payment links map directly to plans via:

`planRules.js`

---

## 🧾 Database Tables

Required Supabase tables:

- `agents`
- `lead_queue`
- `assignment_history`
- `call_logs`
- `events`
- `routing_rules`
- `locks`

---

## 🔒 System Rules

### ❌ Do NOT:
- Run multiple queue processors
- Modify lead status outside OS Brain
- Duplicate Stripe logic
- Bypass lifecycle tracking

### ✅ DO:
- Use OS Brain as single processor
- Use events table for all real-time updates
- Use call lifecycle for every interaction
- Keep Stripe mapping centralized

---

## 📊 Event System

All system activity is streamed through:

- lead_assigned
- lead_created
- call_status_update

Used for:
- dashboards
- live feeds
- auditing
- analytics

---

## 🚀 Deployment

### Environment Variables


SUPABASE_URL=
SUPABASE_SERVICE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=


---

## 🧩 Frontend Rules

- Always display “booked jobs”
- Never use “leads” in UI
- Pricing is fixed:

$1,000 setup + $150 per booked job

---

## 💡 Vision

RoofFlow OS is not a CRM.

It is a **job booking infrastructure layer for roofing companies**, replacing:

- Angi
- HomeAdvisor
- Shared lead marketplaces

---

## 🏗️ Future Modules

Planned upgrades:

- Agent dashboard (live queue view)
- Revenue per agent tracking
- AI routing engine upgrade
- City-based capacity controls
- Auto re-queue failure recovery

---

## 📌 Status

**Production Stage:** Active development  
**Core Engine:** Stable  
**Scaling Model:** Multi-tenant OS

---

## ⚠️ Warning

This system is designed for deterministic execution.

If queue integrity is broken, the system will over-assign or double-book agents.

Keep OS Brain as the only execution layer.




