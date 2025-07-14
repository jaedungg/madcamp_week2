import React, { useEffect, useState } from "react";

const TTSPlayer = () => {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const loadVoice = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const koreanVoice = allVoices.find((v) => v.name === "Google 한국의" && v.lang === "ko-KR");
      if (koreanVoice) {
        setVoice(koreanVoice);
      } else {
        console.warn("해당 음성을 찾을 수 없습니다. 다른 음성을 사용할 수 있습니다.");
      }
    };

    // 일부 브라우저는 비동기적으로 로드됨
    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoice;
      loadVoice();
    }
  }, []);

  const handleSpeak = () => {
    if (!text.trim() || !voice) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = "ko-KR";

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="읽을 문장을 입력하세요"
      />

      <button onClick={handleSpeak} disabled={!voice}>
        읽어줘!
      </button>
    </div>
  );
};

export default TTSPlayer;
