"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import { useRecentMovies } from "@/hooks/useRecentMovies";
import { useMovieCategories } from "@/hooks/useMovieCategories";
import useMoviesByCategory from "@/hooks/useMoviesByCategory";
import { getRandomMovie } from "@/utils/getRandomMovie";
import Image from "next/image";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const {
    movies: recentMovies,
    loading: loadingRecent,
    error: errorRecent,
  } = useRecentMovies();
  const { categories, loading: loadingCategories } = useMovieCategories();
  const {
    movies: categoryMovies,
    loading: loadingCategoryMovies,
    error: errorCategory,
  } = useMoviesByCategory(selectedCategory);


  const handleCheckboxChange = (categoryId) => {
    setSelectedCategory(categoryId); 
    setRandomMovie(null); 
  };

  
  const handleGetRandomMovie = () => {
    const moviesToChooseFrom = selectedCategory ? categoryMovies : recentMovies;
    if (moviesToChooseFrom.length === 0) {
      console.log("No hay películas disponibles.");
      return;
    }

    setIsScrolling(true);

    const container = document.querySelector(`.${styles.containerMovies}`);
    if (container) {
      let scrollAmount = 0;
      const slideTimer = setInterval(() => {
        container.scrollBy(65, 0); 
        scrollAmount += 65;
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          clearInterval(slideTimer);
        }
      }, 65); 
    }

    
    setTimeout(() => {
      const movie = getRandomMovie(moviesToChooseFrom);
      setRandomMovie(movie);
      setIsScrolling(false);
    }, 3000);
  };

  useEffect(() => {
    if (categoryMovies.length) {
      console.log("Películas de la nueva categoría cargadas.");
    }
  }, [categoryMovies]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Easyplay</title>
        <meta name="description" content="Easyplay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image src="/logo.svg" alt="logo" width={200} height={70} />
        <div className={styles.containerBg}>
          <Image src="/texture.svg" alt="logo" fill={true}/>
        </div>
        <h1>¿Qué película vamos a ver hoy?</h1>

        {loadingCategories ? (
          <p>Cargando categorías...</p>
        ) : (
          <section className={styles.allCategories}>
            <h2>Buscar por categoría</h2>
            <div className={styles.containerCategories}>
              {categories.map((category) => (
                <label
                  key={category.id}
                  className={`${styles.category} ${
                    selectedCategory === category.id ? styles.active : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategory === category.id}
                    onChange={() => handleCheckboxChange(category.id)}
                    hidden
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </section>
        )}
        {randomMovie ? (
          <div className={styles.resultContainer}>
            <div className={styles.containerPoster}>
              <span>
                <Image
                  src="/arrow.svg"
                  alt="icon-arrow"
                  width={20}
                  height={20}
                />
              </span>
              <img
                alt="imagen-movie"
                src={
                  randomMovie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=Sin+Imagen"
                }
                className={styles.bgImage}
              />
            </div>
            <div className={styles.info}>
              <h3>{randomMovie.title}</h3>
              <section className={styles.containerComple}>
                <div className={styles.box}>
                  <Image
                    src="/calendar.svg"
                    alt="icon"
                    width={20}
                    height={20}
                  />
                  <p>{randomMovie.release_date}</p>
                </div>
                <div className={styles.box}>
                  <Image src="/eye.svg" alt="icon" width={20} height={20} />
                  <p>{randomMovie.popularity}</p>
                </div>
              </section>
              <p>{randomMovie.overview}</p>
            </div>
          </div>
        ) : (
          <div className={styles.containerMain}>
            {(selectedCategory ? categoryMovies : recentMovies).length === 0 ? (
              <p>
                {selectedCategory
                  ? "Cargando películas de la categoría seleccionada..."
                  : "Cargando películas recientes..."}
              </p>
            ) : (
              <section
                className={`${styles.containerMovies} ${
                  isScrolling ? styles.scrolling : ""
                }`}
              >
                {(selectedCategory ? categoryMovies : recentMovies).map(
                  (movie) => (
                    <div key={movie.id} className={styles.movie}>
                      <img
                        alt="imagen-movie"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/500x750?text=Sin+Imagen"
                        }
                      />
                    </div>
                  )
                )}
              </section>
            )}
          </div>
        )}

        {randomMovie && (
          <button onClick={() => setRandomMovie(null)} className={styles.buttonBack}>
            Nueva busqueda
          </button>
        )}
        {!randomMovie && (
        <button
          onClick={handleGetRandomMovie}
          disabled={
            loadingCategoryMovies ||
            loadingRecent ||
            isScrolling ||
            (!categoryMovies.length && !recentMovies.length)
          }
          className={styles.buttonSend}
        >
          {loadingCategoryMovies || loadingRecent
            ? "Cargando películas..."
            : isScrolling
            ? "Buscando..."
            : "Comenzar ahora!"}
        </button>
        )}
        {errorRecent && <p>{errorRecent}</p>}
        {errorCategory && <p>{errorCategory}</p>}
      </main>
    </>
  );
}
