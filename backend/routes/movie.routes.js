// import express from 'express';
// import * as movieController from '../controllers/movie.controller.js';

// const router = express.Router();
// /**
//  * @swagger
//  * tags:
//  *   name: Movies
//  *   description: 영화 관리 API
//  */

// /**
//  * @swagger
//  * /api/movies:
//  *   get:
//  *     summary: 전체 영화 목록 조회
//  *     tags: [Movies]
//  *     responses:
//  *       200:
//  *         description: 영화 리스트
//  */

// /**
//  * @swagger
//  * /api/movies:
//  *   post:
//  *     summary: 새 영화 추가
//  *     tags: [Movies]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - tmdbId
//  *               - title
//  *             properties:
//  *               tmdbId:
//  *                 type: number
//  *               title:
//  *                 type: string
//  *               overview:
//  *                 type: string
//  *               posterPath:
//  *                 type: string
//  *               releaseDate:
//  *                 type: string
//  *               genres:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *     responses:
//  *       201:
//  *         description: 생성된 영화 반환
//  */

// /**
//  * @swagger
//  * /api/movies/{id}:
//  *   put:
//  *     summary: 특정 영화 정보 수정
//  *     tags: [Movies]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: MongoDB 영화 ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               overview:
//  *                 type: string
//  *               genres:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *     responses:
//  *       200:
//  *         description: 수정된 영화 반환
//  */

// /**
//  * @swagger
//  * /api/movies/{id}:
//  *   delete:
//  *     summary: 특정 영화 삭제
//  *     tags: [Movies]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: MongoDB 영화 ID
//  *     responses:
//  *       204:
//  *         description: 삭제 성공
//  */


// // GET /api/movies
// router.get('/', movieController.getAllMovies);

// // POST /api/movies
// router.post('/', movieController.createMovie);

// // PUT /api/movies/:id
// router.put('/:id', movieController.updateMovie);

// // DELETE /api/movies/:id
// router.delete('/:id', movieController.deleteMovie);


// export default router;
