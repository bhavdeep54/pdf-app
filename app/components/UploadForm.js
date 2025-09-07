"use client";

import { useState } from "react";

export default function UploadForm({ onUploaded }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const file = e.target.file.files[0];
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ PDF uploaded successfully!");
        onUploaded();
      } else {
        alert("❌ Upload failed: " + data.error);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" accept="application/pdf" required />
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </form>
  );
}
