// app/api/ask/route.js
import { NextResponse } from "next/server";
import { answerQuestion } from "@/lib/rag";

export async function POST(req) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json({ error: "No question provided" }, { status: 400 });
    }

    const answer = await answerQuestion(question);

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("❌ Ask API Error:", err);
    return NextResponse.json(
      { error: "Failed to answer question", details: err.message },
      { status: 500 }
    );
  }
}
