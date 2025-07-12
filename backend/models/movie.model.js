import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true }, // TMDB 고유 ID
  title: { type: String, required: true },
  overview: { type: String },
  posterPath: { type: String },
  releaseDate: { type: String },
  genres: [{ type: String }], // TMDB 장르 이름 배열
  language: { type: String, default: 'ko' },
}, { timestamps: true });

const Movie = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);

export default Movie;