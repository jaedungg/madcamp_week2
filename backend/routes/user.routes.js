/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 관리 API
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 모든 유저 조회
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 유저 목록 반환
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: 유저 생성
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteGenres:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: 생성된 유저 반환
 */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// 유저 생성
router.post('/', userController.createUser);

// 유저 전체 조회
router.get('/', userController.getUsers);

// 유저 개별 조회
router.get('/:id', userController.getUserById);

module.exports = router;  // ✅ 반드시 이 줄이 있어야 합니다!
