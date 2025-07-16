import express from 'express';
import commentController from '../controllers/comment.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: 만화 댓글 API
 */

/**
 * @swagger
 * /api/comments/{movieId}/{level}:
 *   post:
 *     summary: 댓글 생성
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - author
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *                 description: 작성자 ID (인증 미적용 시 수동 전달)
 *     responses:
 *       201:
 *         description: 생성된 댓글 객체 반환
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 해당 만화를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.post('/:movieId/:level', commentController.addCommentToComic);
/**
 * @swagger
 * /api/comments/{movieId}/{level}:
 *   get:
 *     summary: 만화의 댓글 목록 조회
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 해당 만화의 댓글 목록 반환
 *       404:
 *         description: 해당 만화를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get('/:movieId/:level', commentController.getCommentsByComicId);
/**
 * @swagger
 * /api/comments/{movieId}/{level}/{commentId}:
 *   put:
 *     summary: 댓글 수정
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content, author
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정된 댓글 반환
 *       400:
 *         description: 유효하지 않은 요청
 *       403:
 *         description: 댓글 작성자만 수정 가능
 *       404:
 *         description: 해당 댓글 또는 만화를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.put('/:movieId/:level/:commentId', commentController.updateComment);
/**
 * @swagger
 * /api/comments/{movieId}/{level}/{commentId}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *             properties:
 *               author:
 *                 type: string
 *     responses:
 *       204:
 *         description: 댓글 삭제 성공
 *       403:
 *         description: 댓글 작성자만 삭제 가능
 *       404:
 *         description: 댓글 또는 만화를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete('/:movieId/:level/:commentId', commentController.deleteComment);

export default router;