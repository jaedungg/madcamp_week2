import Comic from '../models/comic.model.js'; 
import Movie from '../models/movie.model.js'; // 확장자 `.js` 꼭 필요!


export const getComicsByMovieId = async (req, res) => {
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

// export const getComicsByStep = async (req, res) => {
//   try {
//     const comics = await Comic.find({ movie: movie._id })
//       .populate('createdBy', 'nickname') // 유저 닉네임만 포함
//       .select('title type language createdBy'); // 필요한 필드만

//     res.json(comics);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
