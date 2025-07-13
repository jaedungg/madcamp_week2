import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import userController from "../controllers/user.controller.js";

/** @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관련 API
 */

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: 전체 사용자 정보 조회
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 전체 사용자 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id: 
 *                     type: string
 *                   email:
 *                     type: string
 *                   nickname:
 *                     type: string 
 *       404:
 *         description: 사용자 정보를 찾을 수 없음
 *       500:
 *         description: 서버 오류
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

/** 
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: 특정 사용자 프로필 조회
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자 프로필 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *       404:
 *         description: 사용자 정보를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: 유저 프로필 생성
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *               nickname:
 *                 type: string
 *               profileImage:
 *                 type: string
 *               favoriteGenres:
 *                 type: array
 *                 items:
 *                   type: string
 *               language:
 *                 type: string
 *     responses:
 *       201:
 *         description: 유저 생성 완료
 *
 * /api/users/{userId}:
 *   put:
 *     summary: 유저 정보 수정
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               profileImage:
 *                 type: string
 *               favoriteGenres:
 *                 type: array
 *                 items:
 *                   type: string
 *               language:
 *                 type: string
 *     responses:
 *       200:
 *         description: 유저 업데이트 성공
 *       404:
 *         description: 해당 유저 없음
 */
/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: 유저 프로필 삭제
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: 유저 프로필 삭제 성공
 *       404:
 *         description: 해당 유저 없음
 */

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/me", authMiddleware, userController.getMyProfile);
router.get('/:userId', userController.getUserProfile);
router.post("/", userController.createUserProfile);
router.put("/:userId", userController.updateUserProfile);
router.delete("/:userId", userController.deleteUserProfile);
// router.put("/:userId", authMiddleware, userController.updateUserProfile);
// router.delete("/:userId", authMiddleware, userController.deleteUserProfile);

export default router;