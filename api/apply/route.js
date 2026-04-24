app.post("/api/apply", async (req, res) => {
  try {
    const { name, phone, email, city, monthly_jobs, lead_spend } = req.body;

    let qualified = true;

    if (monthly_jobs === "0-5") qualified = false;
    if (lead_spend === "$0") qualified = false;

    await supabase.from("applications").insert({
      name,
      phone,
      email,
      city,
      monthly_jobs,
      lead_spend,
      qualified,
      created_at: new Date().toISOString()
    });

    res.json({ qualified });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});
