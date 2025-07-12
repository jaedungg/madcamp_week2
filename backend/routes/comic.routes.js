import express from 'express';
const router = express.Router();
import comicController from '../controllers/comic.controller.js';


/**
 * @swagger
 * tags:
 *   name: Comics
 *   description: 영화 기반 만화 API
 */

/**
 * @swagger
 * /api/comics:
 *   get:
 *     summary: 영화 ID로 만화 목록 조회
 *     tags: [Comics]
 *     parameters:
 *       - in: query
 *         name: movieId
 *         schema:
 *           type: number
 *         required: true
 *         description: TMDB 기준 영화 ID
 *     responses:
 *       200:
 *         description: 해당 영화의 만화 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum: [summary, parody]
 *                   language:
 *                     type: string
 *                   createdBy:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nickname:
 *                         type: string
 *       400:
 *         description: movieId query param이 없습니다
 *       404:
 *         description: 해당 영화에 대한 만화가 없습니다
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/comics/{comicId}:
 *   get:
 *     summary: 특정 만화 상세 조회 (ComicSteps 포함)
 *     tags: [Comics]
 *     parameters:
 *       - in: path
 *         name: comicId
 *         schema:
 *           type: string
 *         required: true
 *         description: 만화 ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Comic 객체 반환
 *       404:
 *         description: 해당 만화를 찾을 수 없음
 */

/**
 * @swagger
 * /api/comics:
 *   post:
 *     summary: 새 만화 생성
 *     tags: [Comics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - type
 *             properties:
 *               movieId:
 *                 type: string
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [summary, parody]
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: 생성된 Comic 객체 반환
 *       400:
 *         description: 잘못된 요청
 */

/**
 * @swagger
 * /api/comics/{comicId}/steps:
 *   post:
 *     summary: 특정 만화에 ComicStep 추가
 *     tags: [Comics]
 *     parameters:
 *       - in: path
 *         name: comicId
 *         schema:
 *           type: string
 *         required: true
 *         description: 만화 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stepNumber
 *               - imageUrl
 *               - text
 *             properties:
 *               stepNumber:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               text:
 *                 type: string
 *               audioUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Step 추가 완료된 Comic 반환
 *       400:
 *         description: 요청 에러
 */

// GET /api/comics
router.get('/', comicController.getComicsByMovieId);

// GET /api/comics/:comicId
router.get('/:comicId', comicController.getComicById);

// POST /api/comics
router.post('/', comicController.createComic);

// POST /api/comics/:comicId/steps
router.post('/:comicId/steps', comicController.addStepToComic);

export default router;
