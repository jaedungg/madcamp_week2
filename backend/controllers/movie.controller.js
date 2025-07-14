// import Movie from '../models/movie.model.js';

// export const getAllMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find().sort({ createdAt: -1 });
//     res.json(movies);
//   } catch (err) {
//     res.status(500).json({ error: '영화 목록을 불러오는 중 오류 발생' });
//   }
// };

// export const createMovie = async (req, res) => {
//   try {
//     const newMovie = new Movie(req.body);
//     const saved = await newMovie.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: '영화 생성 실패', details: err.message });
//   }
// };

// export const updateMovie = async (req, res) => {
//   try {
//     const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updated) return res.status(404).json({ error: '영화를 찾을 수 없음' });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: '영화 수정 실패' });
//   }
// };

// export const deleteMovie = async (req, res) => {
//   try {
//     const deleted = await Movie.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: '영화를 찾을 수 없음' });
//     res.status(204).send(); // No Content
//   } catch (err) {
//     res.status(500).json({ error: '영화 삭제 실패' });
//   }
// };
