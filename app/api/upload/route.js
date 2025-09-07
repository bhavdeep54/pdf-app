// app/api/upload/route.js
import { NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { generateEmbeddings } from "@/lib/embeddings";
import { saveEmbedding } from "@/lib/vectorStore";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      console.error("❌ No file received");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("✅ File received:", file.name, file.type, file.size);

    const text = await extractTextFromPDF(file);

    console.log("✅ Extracted text length:", text.length);

    const chunks = text.match(/.{1,500}/g) || [];
    for (const chunk of chunks) {
      const embedding = await generateEmbeddings(chunk);
      saveEmbedding(chunk, embedding);
    }

    return NextResponse.json({
      success: true,
      message: "PDF processed successfully",
      chunks: chunks.length,
    });
  } catch (err) {
    console.error("❌ Upload API Error:", err);
    return NextResponse.json(
      { error: "Failed to process PDF", details: err.message },
      { status: 500 }
    );
  }
}
