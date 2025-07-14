'use client';

import{ useState, useEffect } from 'react';
import Link from 'next/link';
import { getMovieDetails } from '../../../lib/api';

type Movie = {
  id: number;
  poster_path: string;
}

type MovieVerticalViewProps = {
  movieIds: number[]; 
};

export default function MovieVerticalView({ movieIds }: MovieVerticalViewProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await Promise.all(
        movieIds.map((id) => getMovieDetails(id.toString()))
      );
      setMovies(results);
    };

    if (movieIds.length > 0) fetchMovies();
  }, [movieIds]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 py-4 w-max">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <img
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : '/images/movie_0.png'}
              alt={`Poster for movie ${movie.id}`}
              className="h-[360px] flex-shrink-0 object-cover rounded cursor-pointer"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
