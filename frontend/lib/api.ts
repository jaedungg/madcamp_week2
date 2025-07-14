import axios from 'axios';

const BASE_URL = 'http://localhost:5050';

export const searchMovies = async (term: string) => {
  const response = await axios.get(`${BASE_URL}/api/tmdb/movie/search`, {
    params: { term },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: string) => {
  const response = await axios.get(`/api/tmdb/movie/${movieId}`);
  return response.data;
};