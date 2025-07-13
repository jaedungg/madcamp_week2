import exp from 'constants';
import Movie from '../models/movie.model.js'; // 확장자 `.js` 꼭 필요!


import models from '../models/comic.model.js';
const Comic = models.Comic;
const ComicStep = models.ComicStep;

// GET /api/coics?movieId={movieId}
const getComicsByMovieId = async (req, res) => {
  try {
    const { movieId } = req.query;

    if (!movieId) {
      return res.status(400).json({ message: 'movieId query param is required' });
    }

    console.log(typeof Movie, Movie);
    const movie = await Movie.findOne({ tmdbId: movieId });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const comics = await Comic.find({ movie: movie._id })
      .populate('createdBy', 'nickname') // 유저 닉네임만 포함
      .select('title type language createdBy'); // 필요한 필드만

    res.json(comics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/comics/:comicId
const getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.comicId)
      .populate('createdBy', 'nickname');
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.json(comic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/comics
const createComic = async (req, res) => {
  try {
    const { movieId, title, type, description } = req.body;
    const comic = new Comic({
      movie: movieId,
      title,
      type,
      description,
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
    const { stepNumber, imageUrl, text, audioUrl } = req.body;
    const comic = await Comic.findById(req.params.comicId);
    if (!comic) return res.status(404).json({ message: 'Comic not found' });

    if (!comic.steps) {
      comic.steps = [];
    }
    comic.steps.push({ stepNumber, imageUrl, text, audioUrl });
    await comic.save();
    res.status(201).json(comic);
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