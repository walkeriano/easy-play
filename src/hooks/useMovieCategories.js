// hooks/useMovieCategories.js
import { useEffect, useState } from 'react';
import { getMovieCategories } from '@/services/tmdbService';

export const useMovieCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await getMovieCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError('Error fetching movie categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};