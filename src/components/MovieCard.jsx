import React, { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { getMovieVideos } from "../services/api";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const { isFavorites, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorites(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  function openMovieDetails() {
    setIsModalOpen(true);
  }

  function closeMovieDetails() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (!isModalOpen || !movie.id) return;

    let ignore = false;

    const loadTrailer = async () => {
      setTrailerLoading(true);
      try {
        const videos = await getMovieVideos(movie.id);
        if (ignore) return;

        const trailer = videos.find(
          (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser"),
        );

        setTrailerKey(trailer?.key || null);
      } finally {
        if (!ignore) {
          setTrailerLoading(false);
        }
      }
    };

    loadTrailer();

    return () => {
      ignore = true;
    };
  }, [isModalOpen, movie.id]);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <>
    <div
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-red-900/20"
      onClick={openMovieDetails}
    >
      <div className="relative h-72 overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-4xl font-black tracking-wider text-white/80">
            {movie.title?.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4">
          <button
            className={`rounded-full border p-2 backdrop-blur transition ${favorite ? "border-red-500 bg-red-600/80" : "border-white/20 bg-white/10 hover:bg-red-600"}`}
            onClick={onFavoriteClick}
            aria-label={`Add ${movie.title} to favorites`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#FFFFFF"
                stroke="#CCCCCC"
                strokeWidth="1"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
        <p className="mt-2 text-sm text-gray-400">
          {movie.release_date ? movie.release_date.slice(0, 4) : "Coming soon"}
        </p>
      </div>
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4" onClick={closeMovieDetails}>
        <div className="relative max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <button
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white hover:bg-red-600"
            onClick={closeMovieDetails}
          >
            Close
          </button>

          <div className="flex flex-col gap-4 md:flex-row">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="h-72 w-full rounded-xl object-cover md:w-48"
              />
            ) : (
              <div className="flex h-72 w-full items-center justify-center rounded-xl bg-neutral-800 text-4xl font-black tracking-wider text-white/80 md:w-48">
                {movie.title?.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-white">{movie.title}</h2>
              <p className="mt-2 text-sm text-gray-400">
                {movie.release_date ? `Release date: ${movie.release_date}` : "Release date: Coming soon"}
              </p>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                {movie.overview || "No description available for this movie yet."}
              </p>
              <button
                className={`mt-4 rounded-full px-4 py-2 text-sm font-medium transition ${favorite ? "bg-red-600 text-white hover:bg-red-500" : "bg-white/10 text-white hover:bg-white/20"}`}
                onClick={onFavoriteClick}
              >
                {favorite ? "Remove from favorites" : "Add to favorites"}
              </button>

              <div className="mt-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">Trailer</h3>
                {trailerLoading ? (
                  <p className="mt-2 text-sm text-gray-400">Loading trailer...</p>
                ) : trailerKey ? (
                  <div className="mt-2 overflow-hidden rounded-xl border border-neutral-800">
                    <iframe
                      className="aspect-video w-full"
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title={`Trailer for ${movie.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-gray-400">No trailer available for this movie right now.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default MovieCard;
