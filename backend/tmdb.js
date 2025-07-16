import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config({ path: './.env.local' });

const API_KEY = process.env.TMDB_API_KEY;  // .env 파일에서 가져오는 방식 추천
const BASE_URL = 'https://api.themoviedb.org/3';

// 키워드로 영화 검색
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

// 영화 ID로 상세 정보 조회
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
    console.error('TMDB 영화 정보 조회 오류:', error.message);
    return null;
  }
}

// 영화 ID로 크레딧 정보 조회
async function getMovieCredits(movieId) {
  console.log('TMDB 영화 크레딧 조회:', movieId);

  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    });

    const data = res.data;

    // 배우 상위 10명 (order 기준 정렬)
    const topCast = [...data.cast]
      .sort((a, b) => a.order - b.order)
      .slice(0, 10)
      .map(person => person.name);

    // 제작진 중 감독 및 각본가만 필터
    const importantCrew = data.crew
      .filter(person => person.job === 'Director' || person.job === 'Screenplay')
      .map(person => ({
        name: person.name,
        job: person.job,
      }));

    return {
      cast: topCast,
      crew: importantCrew,
    };
  } catch (error) {
    console.error('TMDB 영화 크레딧 조회 오류:', error.message);
    return null;
  }
}

// 인기 영화 조회
async function getPopularMovies() {
  console.log('TMDB 인기 영화 조회');

  try {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    });
    return res.data.results.slice(0, 10);
  } catch (error) {
    console.error('TMDB 인기 영화 조회 오류:', error.message);
    return null;
  }
}

// 최신 영화 조회
async function getUpcomingMovies() {
  console.log('TMDB 최신 영화 조회');

  try {
    const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    });
    return res.data.results.slice(0, 10);
  } catch (error) {
    console.error('TMDB 최신 영화 조회 오류:', error.message);
    return null;
  }
}

// 영화 top10 조회
async function getTopRatedMovies() {
  console.log('TMDB 상위권 영화 조회');

  try {
    const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    });
    return res.data.results;
  } catch (error) {
    console.error('TMDB 상위권 영화 조회 오류:', error.message);
    return null;
  }
}

export default { searchMovies, getMovieDetails, getMovieCredits, getPopularMovies, getUpcomingMovies, getTopRatedMovies };
