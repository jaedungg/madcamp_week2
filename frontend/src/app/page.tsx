'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter, redirect } from 'next/navigation';
import RectangleButton from './components/RectangleButton';
import MovieVerticalView from './components/MovieVerticalGallery';
import UserProfile from './components/UserProfile';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  console.log("현재 세션:", session);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col w-full items-start justify-center min-h-screen">
      {/* Background Poster */}
      <div className='relative w-full h-[660px] mb-8'>
        <img 
          src={`/images/horizontal_poster.png`} 
          alt="bg poster" 
          className='flex w-full h-full object-cover'
        />
        <div className='absolute bottom-0 left-0 flex items-center justify-center mx-4 my-4 gap-4'>
          <Link href="/movie/unknown">
            <RectangleButton icon="document" text="영화 상세 페이지" />
          </Link>
        </div>
      </div>

      {/* Title & Movie gallery view */}
      <div className="flex flex-col w-full h-[508px] px-4 overflow-hidden">  
        <div className="flex flex-row items-center gap-2 w-[305px] h-[32px] left-2.5 top-0">
          <img src={"icons/fingerheart.svg"} alt='finger heart' width={20} height={20} />
          <p className="left-[35px] top-0 text-xl text-left text-white">
            마음에 쏙 드실 거예요
          </p>
        </div>
        <MovieVerticalView movieIds={[0,1,2,3,4,5,6,7,8,9]} />
      </div>
      <div className="flex flex-col w-full h-[508px] px-4 overflow-hidden">  
        <div className="flex flex-row items-center gap-2 w-[305px] h-[32px] left-2.5 top-0">
          <img src={"icons/fingerheart.svg"} alt='finger heart' width={20} height={20} />
          <p className="left-[35px] top-0 text-xl text-left text-white">
            최근 본 작품
          </p>
        </div>
        <MovieVerticalView movieIds={[0,1,2,3,4,5,6,7,8,9]} />
      </div>
      <div className="flex flex-col w-full h-[508px] px-4 overflow-hidden">  
        <div className="flex flex-row items-center gap-2 w-[305px] h-[32px] left-2.5 top-0">
          <img src={"icons/fingerheart.svg"} alt='finger heart' width={20} height={20} />
          <p className="left-[35px] top-0 text-xl text-left text-white">
            마음에 쏙 드실 거예요
          </p>
        </div>
        <MovieVerticalView movieIds={[0,1,2,3,4,5,6,7,8,9]} />
      </div>
    </div>
  );
}