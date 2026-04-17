app.post("/webhook", async (req, res) => {

  const event = req.body;

  if(event.type === "checkout.session.completed") {

    const session = event.data.object;

    const email = session.customer_email;

    // 1. Mark user as PAID
    await supabase
      .from("leads")
      .update({ paid: true })
      .eq("email", email);

    // 2. Trigger onboarding email
    sendOnboardingEmail(email);
  }

  res.sendStatus(200);
});



fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name,
    email,
    city,
    message: "New lead submitted and sent to Stripe checkout"
  })
});