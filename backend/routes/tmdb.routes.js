import express from 'express';
import tmdb from '../tmdb.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TMDB
 *   description: TMDB API를 이용한 영화 검색
 */

/**
 * @swagger
 * /api/tmdb/movie/search:
 *   get:
 *     summary: Search movies using TMDB API
 *     tags: [TMDB]
 *     description: Uses The Movie Database (TMDB) API to search for movies based on query.
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie title to search for
 *     responses:
 *       200:
 *         description: A list of matching movies from TMDB
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   overview:
 *                     type: string
 *                   release_date:
 *                     type: string
 *       401:
 *         description: Unauthorized access to TMDB API
 *       500:
 *         description: TMDB API error
 */
router.get('/movie/search', async (req, res) => {
  const query = req.query.term;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: '검색어(term)는 필수입니다.' });
  }

  try {
    const results = await tmdb.searchMovies(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('TMDB 검색 오류:', err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.status_message || 'TMDB API Error',
    });
  }
});

/**
 * @swagger
 * /api/tmdb/movie/popular:
 *   get:
 *     summary: Get popular movies using TMDB API
 *     tags: [TMDB]
 *     responses:
 *       200:
 *         description: 인기 영화 정보
 *       401:
 *         description: Unauthorized access to TMDB API
 *       500:
 *         description: TMDB API error
 */
router.get('/movie/popular', async (req, res) => {
  try {
    const movies = await tmdb.getPopularMovies();
    if (!movies) {
      return res.status(404).json({ error: '영화를 찾을 수 없습니다.' });
    }
    res.status(200).json(movies);
  } catch (err) {
    console.error('TMDB 인기 영화 조회 오류:', err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.status_message || 'TMDB API Error',
    });
  }
});

/**
 * @swagger
 * /api/tmdb/movie/upcoming:
 *   get:
 *     summary: Get upcoming movies using TMDB API
 *     tags: [TMDB]
 *     responses:
 *       200:
 *         description: 인기 영화 정보
 *       401:
 *         description: Unauthorized access to TMDB API
 *       500:
 *         description: TMDB API error
 */
router.get('/movie/upcoming', async (req, res) => {
  try {
    const movies = await tmdb.getUpcomingMovies();
    if (!movies) {
      return res.status(404).json({ error: '영화를 찾을 수 없습니다.' });
    }
    res.status(200).json(movies);
  } catch (err) {
    console.error('TMDB 최신 영화 조회 오류:', err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.status_message || 'TMDB API Error',
    });
  }
});

/**
 * @swagger
 * /api/tmdb/movie/{movieId}:
 *   get:
 *     summary: Get movie details using TMDB API
 *     tags: [TMDB]
 *     description: Retrieves detailed information about a specific movie using TMDB ID.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: TMDB 영화 ID
 *     responses:
 *       200:
 *         description: 상세 영화 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 overview:
 *                   type: string
 *                 release_date:
 *                   type: string
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                 poster_path:
 *                   type: string
 *                 runtime:
 *                   type: integer
 *       401:
 *         description: Unauthorized access to TMDB API
 *       500:
 *         description: TMDB API error
 */
router.get('/movie/:movieId', async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await tmdb.getMovieDetails(movieId);
    if (!movie) {
      return res.status(404).json({ error: '영화를 찾을 수 없습니다.' });
    }
    res.status(200).json(movie);
  } catch (err) {
    console.error('TMDB 상세 조회 오류:', err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.status_message || 'TMDB API Error',
    });
  }
});

/**
 * @swagger
 * /api/tmdb/movie/{movieId}/credits:
 *   get:
 *     summary: Get movie creditss using TMDB API
 *     tags: [TMDB]
 *     description: Retrieves credits about a specific movie using TMDB ID.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: TMDB 영화 ID
 *     responses:
 *       200:
 *         description: 영화 credit 정보
 *       401:
 *         description: Unauthorized access to TMDB API
 *       500:
 *         description: TMDB API error
 */
router.get('/movie/:movieId/credits', async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await tmdb.getMovieCredits(movieId);
    if (!movie) {
      return res.status(404).json({ error: '영화를 찾을 수 없습니다.' });
    }
    res.status(200).json(movie);
  } catch (err) {
    console.error('TMDB 크레딧 정보 조회 오류:', err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.status_message || 'TMDB API Error',
    });
  }
});


export default router;
