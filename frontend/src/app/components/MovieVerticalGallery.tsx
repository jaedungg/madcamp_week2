'use client';

type MovieVerticalViewProps = {
  movieIds: number[]; 
};

export default function MovieVerticalView({ movieIds }: MovieVerticalViewProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 py-4 w-max">
        {movieIds.map((id) => (
          <img
            // key={id}
            src={`/images/movie_${id}.png`}
            alt={`Poster for movie ${id}`}
            className="h-[360px] flex-shrink-0 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
