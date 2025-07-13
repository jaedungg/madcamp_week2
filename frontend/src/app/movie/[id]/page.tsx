'use client';

import RectangleButton from '@/app/components/RectangleButton';
import RoundButton from '@/app/components/RoundButton';
import { useParams, useRouter, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const MovieDetailPage = () => {
  const params = useParams();
  const id = params?.id ?? 'unknown';

  const router = useRouter();
  const [showSummarySteps, setShowSummarySteps] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);

  useEffect(() => {
    console.log('📌 selectedStepId:', selectedStepId);
  }, [selectedStepId]);

  const handleSelectStep = (step: number) => {
    setSelectedStep(step);
    setSelectedStepId(step);
    setDropdownOpen(false);
  };

  return (
    <div className='flex flex-col pt-20 px-4'>
      <div className='flex flex-row'>
        {/* Movie Poster */}
        <img
          src="/images/movie_0.png"
          className="w-[397px] h-[565px] rounded-tl-lg rounded-tr-lg object-contain"
        />
        {/* Movie Details */}
        <div className="flex flex-col justify-start items-start absolute left-[443px] top-[87px] gap-8 w-full pr-4">
          <p className="flex-grow-0 flex-shrink-0 text-[32px] font-semibold text-left text-white">
            극장판 주술회전 0 상세 정보
          </p>
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                감독:{" "}
              </p>
              <p className="text-2xl font-medium text-left text-white">박성후</p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                출연:{" "}
              </p>
              <p className="text-2xl font-medium text-left text-white">
                오가타 메구미, 나카무라 유이치, 우치야마 코우기, 더 보기
              </p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                각본:{" "}
              </p>
              <p className="text-2xl font-medium text-left text-white">세코 히로시</p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                장르:{" "}
              </p>
              <p className="text-2xl font-medium text-left text-white">
                SF &amp; 판타지 애니, 액션 애니, 일본 작품, 액션 &amp; 어드벤처 영화, 애니메이션 영화
              </p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                영화 특징:{" "}
              </p>
              <p className="text-2xl font-medium text-left text-white">
                상상의 나래, 어두운, 흥미진진
              </p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                관람 등급:{" "}
              </p>
              <p className="text-2xl font-medium text-left text-white">
                15세이상관람가, 폭력성, 주제, 공포{" "}
              </p>
            </div>
          </div>
          <p className='self-stretch flex-grow-0 flex-shrink-0 s-[500px] text-2x1 font-medium text-left text-white'>
              &lt;주술회전&gt; 애니메이션 시리즈의 막을 연 사건, 그 이전을 배경으로 한 프리퀄. 아쿠타미
              게게의 원작 만화를 각색하고 더 확장했다.
          </p>
        </div>    
      </div>
      
      <div className="relative mt-2 h-[54px] mb-2">
        <div
          className="flex justify-center items-center h-[54px] w-fit gap-3 px-5 py-2.5 rounded bg-white/40 border-2 border-white/70 cursor-pointer"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <p className="text-[26px] font-medium text-white">
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
          <div className="flex flex-col justify-center items-center w-[232px] h-[94px] absolute top-[60px] left-0 py-2.5 rounded border-2 border-white/70 z-50" style={{ backgroundColor: 'rgb(102, 102, 102)' }}>
            <div className="w-full h-[47px] flex items-center justify-center cursor-pointer hover:bg-[rgb(146,146,146)] transition-colors duration-200" onClick={() => handleSelectStep(1)}>
              <p className="text-[26px] font-medium text-center text-white">
                1단계{" "}
                <span className="text-xl font-medium text-white">(5컷 만화)</span>
              </p>
            </div>
            <div className="w-full h-[47px] flex items-center justify-center cursor-pointer hover:bg-[rgb(146,146,146)] transition-colors duration-200" onClick={() => handleSelectStep(2)}>
              <p className="text-[26px] font-medium text-center text-white">
                2단계{" "}
                <span className="text-xl font-medium text-white">(10컷 만화)</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-row items-center gap-4 mb-4'>
        {/* <RectangleButton icon="headset" text="줄거리 듣기" />  <RectangleButton icon="information" text="상세 정보 보기" transparent={true} /> <RoundButton icon="information"/> */}
        <RectangleButton icon="headset" text="줄거리 듣기" />
        <RectangleButton
          icon="comics"
          text="요약 만화 보기"
          onClick={() => {
            if (selectedStepId !== null) {
              router.push(`/comic/${id}?step=${selectedStepId}`);
            }
          }}
        />
      </div>
    </div>
  );
};

export default MovieDetailPage; 
