"use client";

export default function AnswerBox({ answer }) {
  if (!answer) return null;

  return (
    <div className="answer-box">
      <h2>Answer:</h2>
      <p>{answer}</p>
    </div>
  );
}
