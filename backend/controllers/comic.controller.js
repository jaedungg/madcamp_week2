import exp from 'constants';
import Movie from '../models/movie.model.js'; // 확장자 `.js` 꼭 필요!


import models from '../models/comic.model.js';
const Comic = models.Comic;
const ComicStep = models.ComicStep;

// GET /api/coics/movie/:movieId
const getComicsByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ message: 'movieId query param is required' });
    }

    const comics = await Comic.find({ movieId: movieId })
      .populate('createdBy', 'nickname email name') 
      .select('movieId title level language createdBy comment'); // 필요한 필드만

    res.json(comics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/comics/:comicId
const getComicById = async (req, res) => {
  try {
    const { comicId } = req.params;
    const comic = await Comic.findById(comicId)
      .populate('createdBy', 'nickname email name')
      .select('movieId title level language createdBy comment');

    if (!comic) return res.status(404).json({ message: 'Comic not found' });

    // 해당 comicId에 속한 모든 단계 조회
    const steps = await ComicStep.find({ comic: comicId }).sort('stepNumber');
    
    res.json({
      ...comic.toObject(),  // Mongoose 문서를 평범한 객체로 변환
      steps,                // ComicStep 배열 포함
    });
  } catch (err) {
    console.error('getComicById 오류:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// POST /api/comics/movie/:movieId
const createComic = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const { level, title } = req.body;
    const comic = new Comic({
      movieId: movieId,
      level,
      title,
    });
    await comic.save();
    res.status(201).json(comic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/comics/:comicId/steps
const addStepToComic = async (req, res) => {
  try {
    const { stepNumber, imageUrl, text } = req.body;
    const { comicId } = req.params;

    const comic = await Comic.findById(comicId);
    if (!comic) return res.status(404).json({ message: 'Comic not found' });

    const newStep = new ComicStep({
      comic: comicId,
      stepNumber,
      imageUrl,
      text,
    });

    await newStep.save();

    res.status(201).json(newStep);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default {
  getComicsByMovieId,
  getComicById,
  createComic,
  addStepToComic
};