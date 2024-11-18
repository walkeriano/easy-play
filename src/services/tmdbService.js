
import axios from 'axios';

console.log("API Key:", process.env.NEXT_PUBLIC_TMDB_API_KEY);

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: 'en-US',
  },
});

export default api; 


export const getRecentMovies = async () => {
  const response = await api.get('/movie/now_playing');
  return response.data.results;
};

export const getMovieCategories = async () => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};