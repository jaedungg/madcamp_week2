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
    <div className='flex flex-col pt-20 px-4'>
      <div className='flex flex-row'>
        {/* Movie Poster */}
        <img
          src="/images/movie_0.png"
          className="w-[397px] h-[565px] rounded-tl-lg rounded-tr-lg object-contain"
        />
        {/* Movie Details */}
        <div className="flex flex-col justify-start items-start w-[773px] absolute left-[443px] top-[87px] gap-8">
          <p className="flex-grow-0 flex-shrink-0 text-[32px] font-semibold text-left text-white">
            극장판 주술회전 0 상세 정보
          </p>
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                감독:{" "}
              </p>
              <p className="flex-grow text-2xl font-medium text-left text-white">박성후</p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                출연:{" "}
              </p>
              <p className="flex-grow text-2xl font-medium text-left text-white">
                오가타 메구미, 나카무라 유이치, 우치야마 코우기, 더 보기
              </p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                각본:{" "}
              </p>
              <p className="flex-grow text-2xl font-medium text-left text-white">세코 히로시</p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                장르:{" "}
              </p>
              <p className="flex-grow text-2xl font-medium text-left text-white">
                SF &amp; 판타지 애니, 액션 애니, 일본 작품, 액션 &amp; 어드벤처 영화, 애니메이션 영화
              </p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                영화 특징:{" "}
              </p>
              <p className="flex-grow text-2xl font-medium text-left text-white">
                상상의 나래, 어두운, 흥미진진
              </p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-3">
              <p className="flex-grow-0 flex-shrink-0 text-2xl font-medium text-left text-[#aaa]">
                관람 등급:{" "}
              </p>
              <p className="flex-growtext-2xl font-medium text-left text-white">
                15세이상관람가, 폭력성, 주제, 공포{" "}
              </p>
            </div>
          </div>
          <p className="self-stretch flex-grow-0 flex-shrink-0 w-[773px] text-2xl font-medium text-left text-white">
            &lt;주술회전&gt; 애니메이션 시리즈의 막을 연 사건, 그 이전을 배경으로 한 프리퀄. 아쿠타미
            게게의 원작 만화를 각색하고 더 확장했다.
          </p>
        </div>    
      </div>
      
      <div className="flex justify-center items-center h-[54px] w-[200px] gap-3 px-5 py-2.5 rounded bg-white/40 border-2 border-white/70">
        <p className="flex-grow-0 flex-shrink-0 text-[26px] font-medium text-left text-white">
          요약 단계
        </p>
      </div>
      <div className='flex flex-row items-center gap-4 mb-4'>
        {/* <RectangleButton icon="headset" text="줄거리 듣기" />  <RectangleButton icon="information" text="상세 정보 보기" transparent={true} /> <RoundButton icon="information"/> */}
        <RectangleButton icon="headset" text="줄거리 듣기" />
        <RectangleButton icon="comics" text="요약 만화 보기" />
      </div>
    </div>
  );
};

export default MovieDetailPage; 
