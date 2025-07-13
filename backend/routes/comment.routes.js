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
 * /api/comics/{comicId}/comments:
 *   post:
 *     summary: 댓글 생성
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: comicId
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글을 달 만화의 ID
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
router.post('/:comicId/comments', commentController.addCommentToComic);
/**
 * @swagger
 * /api/comics/{comicId}/comments:
 *   get:
 *     summary: 만화의 댓글 목록 조회
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: comicId
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 만화 ID
 *     responses:
 *       200:
 *         description: 해당 만화의 댓글 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   author:
 *                     type: object
 *                     properties:
 *                       nickname:
 *                         type: string
 *                       profileImage:
 *                         type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: 해당 만화를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get('/:comicId/comments', commentController.getCommentsByComicId);
/**
 * @swagger
 * /api/comics/{comicId}/comments/{commentId}:
 *   put:
 *     summary: 댓글 수정
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: comicId
 *         required: true
 *         schema:
 *           type: string
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
 *               - content
 *               - author
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
router.put('/:comicId/comments/:commentId', commentController.updateComment);
/**
 * @swagger
 * /api/comics/{comicId}/comments/{commentId}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: comicId
 *         required: true
 *         schema:
 *           type: string
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
router.delete('/:comicId/comments/:commentId', commentController.deleteComment);

export default router;