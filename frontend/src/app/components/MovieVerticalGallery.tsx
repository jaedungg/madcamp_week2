'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getMovieDetails } from '../../../lib/api';

type Movie = {
  id: number;
  poster_path: string;
}

type MovieVerticalViewProps = {
  isRated?: boolean;
  movieIds: number[]; 
};

export default function MovieVerticalView({ isRated = false, movieIds }: MovieVerticalViewProps) {
  const uniqueMovieIds = [...new Set(movieIds)];
  const [movies, setMovies] = useState<Movie[]>([]);
  const cacheRef = useRef<Map<number, Movie>>(new Map());

  useEffect(() => {
    const fetchMovies = async () => {
      const newMovies: Movie[] = [];

      for (const id of uniqueMovieIds) {
        if (cacheRef.current.has(id)) {
          newMovies.push(cacheRef.current.get(id)!);
        } else {
          const movie = await getMovieDetails(id.toString());
          cacheRef.current.set(id, movie);
          newMovies.push(movie);
        }
      }

      setMovies(newMovies);
    };

    if (uniqueMovieIds.length > 0) fetchMovies();
  }, [uniqueMovieIds.join(',')]);

  return (
    <div className="w-full scrollbar-hide overflow-x-auto">
      <div className="flex gap-6 py-4 w-max">
        {movies.map((movie, index) => (
          <Link key={`movie-${movie.id}`} href={`/movie/${movie.id}`} className="relative">
            <img
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : '/images/movie_0.png'}
              alt={`Poster for movie ${movie.id}`}
              className="h-[360px] flex-shrink-0 object-cover rounded cursor-pointer transition duration-200 hover:brightness-70"
            />
             {isRated && (
              <div className="absolute top-[-40px] left-[-15px] text-white/70 text-[80px] px-2 py-1 drop-shadow-[0_5px_3px_rgba(0,0,0,0.7)]">
                {index + 1}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
