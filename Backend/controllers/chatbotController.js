import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function chatbot(req, res) {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Convert history into correct GenAI SDK format
    const formattedHistory = history.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Build final request payload
    const contents = [
      {
        role: "user",
        parts: [
          {
            text:
              "You are GoVista, a helpful travel assistant. Reply clearly, concisely, and only about travel.",
          },
        ],
      },
      ...formattedHistory,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const reply = (response.text || "Sorry, I couldn't generate a response.").replace(/\*/g, '');

    res.json({ message: reply });
  } catch (error) {
    console.error("❌ Gemini Error:", error);
    res.json({
      message:
        "I'm having trouble reaching the AI service, but I can still help with general travel advice.",
    });
  }
}
