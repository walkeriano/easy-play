// hooks/useRecentMovies.js
import { useEffect, useState } from 'react';
import { getRecentMovies } from '@/services/tmdbService';

export const useRecentMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const moviesData = await getRecentMovies();
        setMovies(moviesData);
      } catch (err) {
        setError('Error fetching recent movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};