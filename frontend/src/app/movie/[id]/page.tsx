'use client';

import { useParams, useRouter } from 'next/navigation';

const MovieDetailPage = () => {
  const params = useParams();
  const id = params?.id ?? 'unknown';

  const router = useRouter();

  const handleStartComic = (step: number) => {
    router.push(`/comic/${id}?step=${step}`);
  };

  return (
    <div>
      <h1>Movie ID: {id}</h1>
      <button onClick={() => handleStartComic(1)}>1단계 요약 보기</button>
    </div>
  );
};

export default MovieDetailPage; 
