import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-white">Your Favorites</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center shadow-lg">
      <h2 className="text-2xl font-semibold text-white">No favorites yet</h2>
      <p className="mt-2 text-gray-400">
        Start adding movies you love from the home page.
      </p>
    </div>
  );
};

export default Favorites;
