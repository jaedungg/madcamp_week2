import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ImageGeneration
 *   description: 이미지 생성 API
 */
/**
 * @swagger
 * /api/images:
 *   post:
 *     summary: Generate an image based on a prompt
 *     tags: [ImageGeneration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The text prompt for image generation
 *     responses:
 *       200:
 *         description: Successfully generated image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   description: URL of the generated image
 *       500:
 *         description: Image generation failed
 */

router.post("/", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post("http://localhost:8000/generate", { prompt });
    res.json(response.data);
  } catch (err) {
    console.error("Python API error:", err.message);
    res.status(500).json({ error: "Image generation failed." });
  }
});

export default router;