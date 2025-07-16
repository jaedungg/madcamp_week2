'use client';

import RectangleButton from '@/app/components/RectangleButton';
import RoundButton from '@/app/components/RoundButton';
import { useParams, useRouter, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCredits,updateUserProfile, getMyProfile } from '../../../../lib/api'; // adjust path if needed

const MovieDetailPage = () => {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId ?? 'unknown';

  const router = useRouter();
  const { data: session } = useSession();
  const [showSummarySteps, setShowSummarySteps] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
  const [movieData, setMovieData] = useState<any>(null);
  const [movieCredits, setMovieCredits] = useState<any>(null);

  useEffect(() => {
    console.log('📌 selectedStepId:', selectedStepId);
  }, [selectedStepId]);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(id);
      setMovieData(data);
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchCredits = async () => {
      const credits = await getMovieCredits(id);
      setMovieCredits(credits);
    };
    fetchCredits();
  }, [id]);
  

  const handleSelectStep = (step: number) => {
    setSelectedStep(step);
    setSelectedStepId(step);
    setDropdownOpen(false);
  };

  return (
    <div className='flex flex-col pt-20 px-6'>
      <div className='flex flex-row'>
        {/* Movie Poster */}
        <img
          src={movieData?.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : '/images/loading.png'}
          className="h-[540px] w-[400px] object-cover rounded object-contain"
        />
        {/* Movie Details */}
        <div className="flex flex-col justify-start items-start text-[22px] ml-8 mr-26 gap-4 flex-1">
          <p className="flex-grow-0 flex-shrink-0 text-3xl font-semibold text-left text-white">
            {movieData?.title ?? 'Loading...'}
          </p>
          <div className="flex flex-col self-stretch flex-grow-0 flex-shrink-0 gap-4">
            {movieCredits ? (
              <>
                {movieCredits.crew
                  ?.filter((member: any) => member.job === 'Director')
                  .map((member: any) => (
                    <div key={member.credit_id} className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
                      <p className="flex-grow-0 flex-shrink-0 text-[#aaa]">
                        감독:
                      </p>
                      <p className="text-white">
                        {member.name ?? '...'}
                      </p>
                    </div>
                  ))}
                {Array.isArray(movieCredits.cast) && (
                  <div className="flex self-stretch gap-3">
                    <p className="flex-shrink-0 text-[#aaa]">
                      출연:
                    </p>
                    <p className="text-white break-keep">
                      {movieCredits.cast.join(', ') ?? '...'}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-7 relative gap-3">
                  <p className="flex-grow-0 flex-shrink-0 text-[#aaa]">
                    감독:{" "}
                  </p>
                  <p className="text-white">
                    {movieData?.genres?.map((g: any) => g.name).join(', ') ?? '...'}
                  </p>
                </div>
                <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-7 relative gap-3">
                  <p className="flex-grow-0 flex-shrink-0 text-[#aaa]">
                    출연:{" "}
                  </p>
                  <p className="text-white">
                    {movieData?.genres?.map((g: any) => g.name).join(', ') ?? '...'}
                  </p>
                </div>
              </>

            )}
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-[#aaa]">
                장르:{" "}
              </p>
              <p className="text-white">
                {movieData?.genres?.map((g: any) => g.name).join(', ') ?? '...'}
              </p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-[#aaa]">
                개봉일:{" "}
              </p>
              <p className="text-white">
                {movieData?.release_date ?? '...'}
              </p>
            </div>
          </div>
          <p className='self-stretch flex-grow-0 flex-shrink-0 text-white break-keep'>
              {movieData?.overview ?? '영화 설명을 불러오는 중입니다.'}
          </p>
        </div>    
      </div>
      

      <div className='flex flex-row items-center gap-3 pt-4'>
        <div className="relative mt-2 mb-2">
          <div
            className="flex justify-center items-center h-[48px] w-fit gap-3 px-5 py-2.5 rounded bg-white/40 border-2 border-white/70 cursor-pointer hover:bg-[rgb(146,146,146)] transition-colors duration-200"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <p className="text-xl text-white">
              {selectedStep === 1
                ? '1단계 (5컷 만화)'
                : selectedStep === 2
                ? '2단계 (10컷 만화)'
                : '요약 단계'}
            </p>
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {dropdownOpen ? (
                <path d="M0.833344 17.5H19.1667L10 1.66667" fill="white" />
              ) : (
                <path d="M0.833344 2.5L19.1667 2.5L10 18.3333" fill="white" />
              )}
            </svg>
          </div>

          {dropdownOpen && (
            <div className="flex flex-col justify-center items-center w-[200px] h-[88px] absolute top-[52px] left-0 py-2.5 rounded border-2 border-white/70 z-50" style={{ backgroundColor: 'rgb(102, 102, 102)' }}>
              <div className="w-full h-[44px] flex items-center justify-center cursor-pointer hover:bg-[rgb(146,146,146)] transition-colors duration-200" onClick={() => handleSelectStep(1)}>
                <p className="text-xl font-medium text-center text-white">
                  1단계{" "}
                  <span className="text-xl font-medium text-white">(5컷 만화)</span>
                </p>
              </div>
              <div className="w-full h-[44px] flex items-center justify-center cursor-pointer hover:bg-[rgb(146,146,146)] transition-colors duration-200" onClick={() => handleSelectStep(2)}>
                <p className="text-xl font-medium text-center text-white">
                  2단계{" "}
                  <span className="text-xl font-medium text-white">(10컷 만화)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* <RectangleButton icon="headset" text="줄거리 듣기" />  <RectangleButton icon="information" text="상세 정보 보기" transparent={true} /> <RoundButton icon="information"/> */}
        <RectangleButton
          icon="comics"
          text="요약 만화 보기"
          onClick={async () => {
            if (selectedStepId !== null && id !== 'unknown' && session?.user?.id) {
              try {
                const profile = await getMyProfile(session.user.id);
                console.log("✅ 현재 사용자 프로필:", profile);
                const prevIds = profile.recentMovies ?? [];
                const filteredIds = prevIds.filter((mid: string) => mid !== id);
                const newIds = [id, ...filteredIds];
                const trimmed = newIds.slice(0, 10);
                console.log("📌 업데이트할 recentMovies:", trimmed);
                await updateUserProfile(session.user.id, { recentMovies: trimmed });
              } catch (error) {
                console.error("최근 본 영화 업데이트 실패:", error);
              }
              router.push(`/comic/${id}?step=${selectedStepId}`);
            }
          }}
        />
      </div>
    </div>
  );
};

export default MovieDetailPage; 
