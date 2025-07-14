import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config({ path: './.env.local' });

const API_KEY = process.env.TMDB_API_KEY;  // .env 파일에서 가져오는 방식 추천
const BASE_URL = 'https://api.themoviedb.org/3';

async function searchMovies(query) {
  console.log('TMDB 검색어:', query);

  try {
    const res = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error('TMDB 검색 오류:', error.message);
    return [];
  }
}

async function getMovieDetails(movieId) {
  console.log('TMDB 영화 정보 조회:', movieId);

  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    });
    return res.data;
  } catch (error) {
    console.error('TMDB 검색 오류:', error.message);
    return null;
  }
}

export default { searchMovies, getMovieDetails };
