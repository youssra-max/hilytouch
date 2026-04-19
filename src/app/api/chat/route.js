import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_OPENAI_API_KEY || "AIzaSyDgcpAWHefJHzqal4kmNCtIim09jylFHaM");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return new Response(JSON.stringify({ error: "Missing message" }), { status: 400 });
    }

    const systemPrompt = `Tu es l'assistant IA Hilytouch. Ton nom est Hilytouch IA. 
    Tu conseilles les utilisateurs sur les produits de beauté (skincare et makeup) Made in Algeria.
    Réponds toujours en français, sois chaleureux, concis, et professionnel.`;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Compris, je vais agir en tant que l'assistant Hilytouch IA." }] },
      ]
    });

    const result = await chat.sendMessage(userMessage);
    const text = result.response.text();

    return new Response(JSON.stringify({ response: text }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Gemini Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate AI response." }), { status: 500 });
  }
}