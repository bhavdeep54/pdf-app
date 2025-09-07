// lib/pdfParser.js
import pdfParse from "pdf-parse";

// completely disable pdf-parse's self-test
process.env.AUTO_KENT_DEBUG = "false";

export async function extractTextFromPDF(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const pdfData = await pdfParse(buffer);
  return pdfData.text;
}
