import express from "express";
import ttsController from "../controllers/tts.controller.js";   

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TTS
 *   description: Text-to-Speech API
 */
/**
 * @swagger
 * /api/tts/{movieId}/{level}:
 *   post:
 *     summary: Generate TTS audio for a movie
 *     tags: [TTS]
 *     description: Generates TTS audio for a specific movie using Google Cloud Text-to-Speech.
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
/**
 * @swagger
 * /api/tts/:
 *   post:
 *     summary: Generate TTS audio for a movie step
 *     tags: [TTS]
 *     description: Generates TTS audio for a specific movie step using Google Cloud Text-to-Speech.
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


// POST /api/tts/{movieId}/{level}
router.post("/:movieId/:level", ttsController.generateTTSSteps);

// POST /api/tts/{movieId}/{level}/{step}
router.post("/", ttsController.generateTTS);

export default router;


