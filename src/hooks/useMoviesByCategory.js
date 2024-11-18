import { useState, useEffect } from "react";
import api from "@/services/tmdbService";

const useMoviesByCategory = (categoryId) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/discover/movie", {
          params: {
            with_genres: categoryId,
          },
        });

        // Verifica la respuesta
        console.log('Películas de la categoría:', response.data.results);

        setMovies(response.data.results);
      } catch (err) {
        setError("Error al obtener las películas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [categoryId]);

  return { movies, loading, error };
};

export default useMoviesByCategory;