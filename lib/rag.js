// lib/rag.js
import { getAllEmbeddings, cosineSimilarity } from "./vectorStore.js";
import { generateEmbeddings } from "./embeddings.js";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function answerQuestion(question) {
  const qEmbedding = await generateEmbeddings(question);

  // Rank stored chunks
  const db = getAllEmbeddings();
  const ranked = db
    .map((item) => ({
      chunk: item.chunk,
      score: cosineSimilarity(qEmbedding, item.embedding),
    }))
    .sort((a, b) => b.score - a.score);

  const context = ranked.slice(0, 3).map((r) => r.chunk).join("\n\n");

  // Generate answer
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant answering questions about a PDF.",
      },
      { role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` },
    ],
  });

  return completion.choices[0].message.content;
}
