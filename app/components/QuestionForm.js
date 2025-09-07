"use client";

import { useState } from "react";

export default function QuestionForm({ onAnswer }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      if (res.ok) {
        onAnswer(data.answer);
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Ask error:", err);
      alert("❌ Failed to get answer.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something about the PDF..."
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>
    </form>
  );
}
