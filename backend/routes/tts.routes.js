import express from "express";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";        
import { dirname } from "path";              

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TTS
 *   description: Text-to-Speech API
 */
/**
 * @swagger
 * /api/tts/{movieId}/{level}/{step}:
 *   post:
 *     summary: Generate TTS audio for a movie step
 *     tags: [TTS]
 *     description: Generates TTS audio for a specific movie step using Google Cloud Text-to-Speech.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: TMDB 기준 영화 ID
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: number
 *           enum: [1, 2]
 *         description: 만화 레벨 (1 또는 2)
 *       - in: path
 *         name: step
 *         required: true
 *         schema:
 *           type: number
 *         description: 만화 단계 (step number)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text to convert to speech
 *     responses:
 *       200:
 *         description: TTS audio generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL of the generated TTS audio file
 *       400:
 *         description: Bad request, no text provided
 *       500:
 *         description: Internal server error, TTS generation failed
 */


// Google TTS 클라이언트 설정
const client = new TextToSpeechClient({
  keyFilename: path.join(__dirname, "../google-credentials.json")
});

// POST /api/tts/{movieId}/{level}/{step}
router.post("/:movieId/:level/:step", async (req, res) => {
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
});

export default router;
