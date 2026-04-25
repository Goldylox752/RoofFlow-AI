export async function sendSMS(phone, message) {
  try {
    console.log("SMS to:", phone, message);

    // placeholder (replace with Twilio later)
    return { success: true };
  } catch (err) {
    console.error("SMS error:", err.message);
    return { success: false };
  }
}
