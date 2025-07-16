import axios from 'axios';

const BASE_URL = 'http://localhost:5050';

export const searchMovies = async (term: string) => {
  const response = await axios.get(`${BASE_URL}/api/tmdb/movie/search`, {
    params: { term },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: string) => {
  console.log("getMovieDetails called with movieId:", movieId);
  const response = await axios.get(`${BASE_URL}/api/tmdb/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/api/tmdb/movie/${id}/credits`);
  return res.data;
};
export const getAllUsers = async () => {
  const response = await axios.get(`${BASE_URL}/api/users`);
  return response.data;
};

export const getMyProfile = async (movieId: string) => {
  const response = await axios.get(`${BASE_URL}/api/users/me/${movieId}`);
  return response.data;
};

export const getUserProfile = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
  return response.data;
};

export const createUserProfile = async (data: {
  email: string;
  nickname?: string;
  profileImage?: string;
  favoriteGenres?: string[];
  language?: string;
}) => {
  const response = await axios.post(`${BASE_URL}/api/users`, data);
  return response.data;
};

export const updateUserProfile = async (userId: string, data: {
  nickname?: string;
  profileImage?: string;
  bannerImage?: string;
  favoriteGenres?: string[];
  language?: string;
  recentMovies?: string[];
}) => {
  const response = await axios.put(`${BASE_URL}/api/users/${userId}`, data);
  return response.data;
};

export const deleteUserProfile = async (userId: string) => {
  const response = await axios.delete(`${BASE_URL}/api/users/${userId}`);
  return response.data;
};

export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/api/tmdb/movie/popular`);
  if (!res.ok) throw new Error('Failed to fetch popular movies');
  return res.json();
};

export const fetchTopRatedMovies = async () => {
  const res = await fetch(`${BASE_URL}/api/tmdb/movie/top_rated`);
  if (!res.ok) throw new Error('Failed to fetch top_rated movies');
  return res.json();
};

export const fetchLatestMovies = async () => {
  const res = await fetch(`${BASE_URL}/api/tmdb/movie/upcoming`);
  if (!res.ok) throw new Error('Failed to fetch latest movies');
  return res.json();
};

export const generateTTS = async (
  text: string
) => {
  const response = await axios.post(
    `${BASE_URL}/api/tts`,
    { text }
  );
  return response.data;
};

// get comment
export async function getComments(movieId: number, level: number = 1) {
  try {
    const res = await axios.get(`${BASE_URL}/api/comments/${movieId}/${level}`);

    return res.data; // [{ content, author, createdAt, ... }, ...]
  } catch (err) {
    console.error('댓글 불러오기 실패:', err);
    return [];
  }
}

// add comment
export async function addComment(movieId: number, level: number, content: string, author: string) {
  try {
    const res = await axios.post(`${BASE_URL}/api/comments/${movieId}/${level}`, {
      content,
      author,
    });
    return res.data;
  } catch (err) {
    console.error('댓글 등록 실패:', err);
    return null;
  }
}

// delete comment
export async function deleteComment(movieId: number, level: number, commentId: string, author: string) {
  try {
    const res = await axios.delete(`${BASE_URL}/api/comments/${movieId}/${level}/${commentId}`, {
      data: { author },
    });
    return res.data;
  } catch (err) {
    console.error('댓글 등록 실패:', err);
    return null;
  }
}
