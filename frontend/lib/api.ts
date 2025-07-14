import axios from 'axios';

const BASE_URL = 'http://localhost:5050';

export const searchMovies = async (term: string) => {
  const response = await axios.get(`${BASE_URL}/api/tmdb/movie/search`, {
    params: { term },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: string) => {
  const response = await axios.get(`${BASE_URL}/api/tmdb/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/api/tmdb/movie/${id}/credits`);
  return res.data;
};