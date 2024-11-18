// utils/getRandomMovie.js
export const getRandomMovie = (movies) => {
    if (!movies || movies.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  };