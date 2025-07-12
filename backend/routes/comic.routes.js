const express = require('express');
const router = express.Router();
const comicController = require('../controllers/comic.controller');

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

router.get('/', comicController.getComicsByMovieId);

module.exports = router;
