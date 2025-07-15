import fs from "fs";
import path from "path";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// TTS 클라이언트 설정
const client = new TextToSpeechClient({
  keyFilename: path.join(__dirname, "../google-credentials.json")
});

// POST /api/tts/:movieId/:level
async function generateTTSSteps(req, res) {
  const { movieId, level } = req.params;
  console.log("TTS 요청:", { movieId, level });

  try {
    const jsonPath = path.join(__dirname, "../../frontend/public/data");
    const jsonFilePath = path.join(jsonPath, `${movieId}_${level}.json`);

    if (!fs.existsSync(jsonFilePath)) {
      return res.status(404).json({ error: "JSON file not found" });
    }

    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    const ttsPath = path.join(__dirname, "../../frontend/public/tts");

    if (!fs.existsSync(ttsPath)) {
      fs.mkdirSync(ttsPath, { recursive: true });
    }

    const urls = [];

    for (let i = 0; i < jsonData.length; i++) {
      const step = jsonData[i];
      const text = `${step.title.slice(2)}. ${step.description}`;
      const filename = `${movieId}_${level}_${i + 1}.mp3`;
      const filePath = path.join(ttsPath, filename);

      const request = {
        input: { text },
        voice: {
          languageCode: "ko-KR",
          name: "ko-KR-Wavenet-D",
        },
        audioConfig: { audioEncoding: "MP3" },
      };

      const [response] = await client.synthesizeSpeech(request);
      fs.writeFileSync(filePath, response.audioContent, "binary");
      urls.push(`/tts/${filename}`);
    }

    res.json({ urls });
  } catch (err) {
    console.error("TTS Error:", err.message);
    res.status(500).json({ error: "Text-to-Speech generation failed" });
  }
}

// POST /api/tts/{movieId}/{level}/{step}
async function generateTTS(req, res) {
  const { movieId, level, step } = req.params;
  console.log("TTS 요청:", { movieId, level, step });
  
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  const request = {
    input: { text },
    voice: {
      languageCode: "ko-KR", // 한국어
      name: "ko-KR-Wavenet-D", // 남성 음성 (다른 것도 가능)
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);

    const filename = `${movieId}_${level}_${step}.mp3`;
    const ttsPath = path.join(__dirname, "../../frontend/public/tts");
    const filePath = path.join(ttsPath, filename);

    // public/tts 폴더 없으면 생성
    if (!fs.existsSync(ttsPath)) {
      fs.mkdirSync(ttsPath, { recursive: true });
    }

    // mp3 저장
    fs.writeFileSync(filePath, response.audioContent, "binary");

    // mp3 URL 반환
    res.json({ url: `/tts/${filename}` });

  } catch (err) {
    console.error("TTS Error:", err.message);
    res.status(500).json({ error: "Text-to-Speech failed" });
  }
};


export default { generateTTS, generateTTSSteps };