'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter, redirect } from 'next/navigation';
import RectangleButton from './components/RectangleButton';
import MovieVerticalView from './components/MovieVerticalGallery';
import UserProfile from './components/UserProfile';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { fetchTopRatedMovies, fetchPopularMovies,fetchLatestMovies,getMyProfile,getMovieDetails  } from '../../lib/api';

export default function Home() {
  const { data: session } = useSession();
  interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  // 필요한 필드들 추가
}
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularDetails, setPopularDetails] = useState<{ id: number; title: string }[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [topRatedMovieIds, setTopRatedMovieIds] = useState<number[]>([]);
  const [latestMovieIds, setLatestMovieIds] = useState<number[]>([]);
  const [recentViewedIds, setRecentViewedIds] = useState<number[]>([]);


  useEffect(() => {
    console.log(topRatedMovieIds);
  }, [topRatedMovieIds]); 
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const scrollLeft = scrollElement.scrollLeft;
      const width = scrollElement.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveIndex(newIndex);
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const fetchPopular = async () => {
      const data = await fetchPopularMovies();
      setPopularMovies(data.slice(2, 10));
      // Fetch detailed info for each popular movie
      const ids = data.slice(2, 10).map((m: any) => m.id);
      Promise.all(ids.map((id: number) => getMovieDetails(id.toString())))
        .then(details => setPopularDetails(details.map(d => ({ id: d.id, title: d.title }))))
        .catch(err => console.error('영화 상세 불러오기 실패:', err));
    };
    fetchPopular();
  }, []);

  useEffect(() => {
    const fetchTopRated = async () => {
      const data = await fetchTopRatedMovies();
      setTopRatedMovieIds(data.map((movie: any) => movie.id));
      
    };
    fetchTopRated();
  }, []);

  useEffect(() => {
    if (!scrollRef.current || popularMovies.length === 0) return;

    const interval = setInterval(() => {
      const width = scrollRef.current!.clientWidth;
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % popularMovies.length;
        scrollRef.current!.scrollTo({ left: width * nextIndex, behavior: 'smooth' });
        return nextIndex;
      });
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [popularMovies]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const data = await fetchLatestMovies();
        if (Array.isArray(data)) {
          setLatestMovieIds(data.map((movie: any) => movie.id));
        } else if (data?.id) {
          setLatestMovieIds([data.id]);
        }
      } catch (error) {
        console.error('최신 영화 불러오기 실패:', error);
      }
    };
    fetchLatest();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (session?.user?.id) {
        console.log("✅ getMyProfile 호출 직전");
        const profile = await getMyProfile(session.user.id)
        console.log("✅ getMyProfile 응답:", profile);
        console.log("getMyProfile 응답:", profile);
        if (Array.isArray(profile?.recentMovies)) {
          const ids = profile.recentMovies;
          console.log("✅ recentViewedIds 설정:", ids);
          setRecentViewedIds(ids);
        } else {
          console.warn("❌ profile.recentMovies가 배열이 아님:", profile?.recentMovies);
        }
      }
      } catch (error) {
        console.error('최근 본 영화 불러오기 실패:', error);
      }
    };
    fetchProfile();
  }, []);
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="flex flex-col w-full items-start justify-center min-h-screen">
      {/* Background Poster */}
      <div className='relative w-full h-[660px] mb-8'>
        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory w-full h-full scrollbar-hide">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="relative flex-shrink-0 w-full h-full">
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover snap-center"
              />
              <div
                className="absolute bottom-18 left-4 px-2 py-1 text-white text-4xl font-bold"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
              >
                {popularDetails.find(d => d.id === movie.id)?.title || movie.title}
              </div>
            </div>
          ))}
        </div>
        <div className='absolute bottom-0 left-2 flex items-center justify-center mx-4 my-4 gap-4'>
          {popularMovies[activeIndex] && (
            <Link href={`/movie/${popularMovies[activeIndex].id}`}>
              <RectangleButton icon="document" text="영화 상세 페이지" />
            </Link>
          )}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {popularMovies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollRef.current) {
                  const width = scrollRef.current.clientWidth;
                  scrollRef.current.scrollTo({ left: width * idx, behavior: 'smooth' });
                }
              }}
              className={activeIndex != idx ? `hover:opacity-60` : ``}
            >
              <svg
                width={8}
                height={8}
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <circle
                  cx={4}
                  cy={4}
                  r={4}
                  fill="white"
                  fillOpacity={activeIndex === idx ? '1' : '0.5'}
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Title & Movie gallery view */}
      <div className='flex flex-col w-full px-6 py-2 gap-8'>
        <div className="flex flex-col w-full overflow-hidden">  
          <div className="flex flex-row items-center gap-2 \">
            <img src={"icons/heart.svg"} alt='finger heart' width={32} height={32} />
            <p className="left-[35px] top-0 text-2xl text-left font-bold text-white">
              오늘의 TOP 20
            </p>
          </div>
            <div className="overflow-x-auto scrollbar-hide">
              <MovieVerticalView isRated={true} movieIds={topRatedMovieIds} />
            </div>
        </div>
        <div className="flex flex-col w-full overflow-hidden">  
          <div className="flex flex-row items-center gap-2 ">
            <img src={"icons/clock.svg"} alt='finger heart' width={28} height={28} />
            <p className="left-[35px] top-0 text-2xl text-left font-bold text-white">
              최근 본 영화
            </p>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            {recentViewedIds.length == 0 && (
              <p className="text-xl text-white/50 py-2">최근 본 영화가 없습니다.</p>
            )}
            <MovieVerticalView movieIds={recentViewedIds} />
          </div>
        </div>
        <div className="flex flex-col w-full overflow-hidden">  
          <div className="flex flex-row items-center gap-2 ">
            <img src={"icons/megaphone.svg"} alt='finger heart' width={28} height={28} />
            <p className="left-[35px] top-0 text-2xl text-left font-bold text-white">
              최신영화
            </p>
          </div>
            <MovieVerticalView movieIds={latestMovieIds} />
        </div>
      </div>
    </div>
  );
}