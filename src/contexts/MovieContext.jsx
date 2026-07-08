import React from "react";
import { createContext, useEffect, useState, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const storedFavs = window.localStorage.getItem("favorites");
      return storedFavs ? JSON.parse(storedFavs) : [];
    } catch (error) {
      console.error("Failed to load favorites", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieID) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieID));
  };

  const isFavorites = (movieID) => {
    return favorites.some((movie) => movie.id === movieID);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorites,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
