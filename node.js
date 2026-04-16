import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// 🔐 Middleware
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  if (key !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// 🚀 Lead endpoint
app.post("/api/new-lead", async (req, res) => {
  try {
    const { name, phone, city, issue } = req.body;

    if (!name || !phone || !city) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Save to database
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          phone,
          city,
          issue,
          created_at: new Date()
        }
      ]);

    if (error) throw error;

    // 🔔 OPTIONAL: send to Slack / email / SMS here

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("API running"));
