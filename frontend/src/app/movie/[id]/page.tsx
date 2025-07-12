'use client';

import RectangleButton from '@/app/components/RectangleButton';
import RoundButton from '@/app/components/RoundButton';
import { useParams, useRouter, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const MovieDetailPage = () => {
  const params = useParams();
  const id = params?.id ?? 'unknown';

  const router = useRouter();

  const handleStartComic = (step: number) => {
    router.push(`/comic/${id}?step=${step}`);
  };

  return (
    <div className='pt-20 px-4'>
      <div className='flex-row items-center justify-between mb-4'>
        <RectangleButton icon="headset" text="줄거리 듣기" /> <RectangleButton icon="information" text="상세 정보 보기" transparent={true} /> <RoundButton icon="information"/>
      </div>
      
      <h1>Movie ID: {id}</h1>
      <button onClick={() => handleStartComic(1)}>1단계 요약 보기</button>
    </div>
  );
};

export default MovieDetailPage; 
