import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import userController from "../controllers/user.controller.js";

/** @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관련 API
 */
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: 현재 사용자 정보 조회
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 현재 사용자 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id: 
 *                   type: string
 *                 email:
 *                   type: string
 *                 nickname:
 *                   type: string 
 *                 profileImage:
 *                   type: string
 *                 favoriteGenres:
 *                   type: array
 *                   items:
 *                     type: string 
 *                 likedMovies:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: 인증되지 않은 요청
 *       404:
 *         description: 사용자 정보를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */ 


const router = express.Router();

router.get("/me", verifyJWT, userController.getUserById);

export default router;