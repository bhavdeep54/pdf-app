"use client";

import { useState } from "react";
import UploadForm from "./components/UploadForm";
import QuestionForm from "./components/QuestionForm";
import AnswerBox from "./components/AnswerBox";

export default function HomePage() {
  const [uploaded, setUploaded] = useState(false);
  const [answer, setAnswer] = useState("");

  return (
    <main>
      <h1>📄 PDF Q&A App</h1>

      {!uploaded ? (
        <UploadForm onUploaded={() => setUploaded(true)} />
      ) : (
        <>
          <QuestionForm onAnswer={(ans) => setAnswer(ans)} />
          <AnswerBox answer={answer} />
        </>
      )}
    </main>
  );
}
