// lib/vectorStore.js
let vectorDB = []; // reset every restart

export function saveEmbedding(chunk, embedding) {
  vectorDB.push({ chunk, embedding });
}

export function getAllEmbeddings() {
  return vectorDB;
}

// cosine similarity
export function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}
