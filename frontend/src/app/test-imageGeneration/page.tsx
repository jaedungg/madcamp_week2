// 예: frontend/src/app/page.tsx (또는 page.jsx)

'use client'
import { useState } from "react"

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setImage(`data:image/png;base64,${data.image}`);
  };

  return (
    <div>
      <input 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Enter your prompt" 
      />
      <button onClick={handleGenerate}>Generate</button>
      {image && <img src={image} alt="Generated" />}
    </div>
  );
}
