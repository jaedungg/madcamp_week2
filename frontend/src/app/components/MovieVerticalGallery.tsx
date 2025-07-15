'use client';

import { useState, useEffect, useRef } from 'react';
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
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 py-4 w-max">
        {movies.map((movie) => (
          <Link key={`movie-${movie.id}`} href={`/movie/${movie.id}`}>
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
