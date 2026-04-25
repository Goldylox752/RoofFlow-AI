import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function aiScoreLead(data) {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: JSON.stringify(data),
        },
      ],
      temperature: 0.2,
    });

    return JSON.parse(res.choices[0].message.content);
  } catch (err) {
    return {
      score: 0,
      reason: "AI unavailable (non-critical)",
    };
  }
}
