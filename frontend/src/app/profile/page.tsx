'use client';

import MovieVerticalView from '../components/MovieVerticalGallery';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import{ updateUserProfile, getMyProfile } from '../../../lib/api';
import { useProfileStore } from '../../../store/profileStore';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [coverImage, setCoverImage] = useState<string>('/images/banner.jpg');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nickname, setNickname] = useState('');
  const [recentViewedIds, setRecentViewedIds] = useState<number[]>([]);
  const profileImage = useProfileStore((state) => state.profileImage);
  const setProfileImage = useProfileStore((state) => state.setProfileImage);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (session?.user?.id) {
          const profile = await getMyProfile(session.user.id);
          if (profile?.nickname) {
            setNickname(profile.nickname);
          }
          if (profile?.bannerImage) {
            setProfileImage(profile.profileImage || '/images/profile.png');
          }
          if (profile?.bannerImage) {
            setCoverImage(profile.bannerImage);
          }
        }
      } catch (err) {
        console.error('프로필 불러오기 실패:', err);
      }
    };
    fetchProfile();
  }, [session]);

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

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("📂 파일 선택됨");
    const file = e.target.files?.[0];
    if (file) {
    console.log("📸 파일 있음:", file.name);
      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          setCoverImage(reader.result);
          console.log("🪄 저장할 배너 이미지 URL:", reader.result.slice(0, 100));
          if (session?.user?.id) {
            await updateUserProfile(session.user.id, { bannerImage: reader.result }); // 서버가 있어야 가능
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("📂 파일 선택됨");
    const file = e.target.files?.[0];
    if (file) {
    console.log("📸 파일 있음:", file.name);
      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
          console.log("🪄 저장할 프로필 이미지 URL:", reader.result.slice(0, 100));
          if (session?.user?.id) {
            await updateUserProfile(session.user.id, { profileImage: reader.result }, ); // 서버가 있어야 가능
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameSave = async () => {
    if (session?.user?.id && nickname) {
      await updateUserProfile(session.user.id, { nickname });
      setIsEditingName(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-black mx-auto px-4 pb-8">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverImageChange}
        />
        <img
          src={coverImage}
          className="w-full h-[200px] absolute left-1/2 -translate-x-1/2 object-cover"
          alt="Cover"
        />
      </label>
      {/* Logout button at bottom-right of cover image area */}
      <div className="absolute right-[24px] top-[210px] pt-4">
        <div
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-1 rounded-md bg-white/20 border border-white/40 hover:bg-white/40 hover:shadow-md transition-all duration-200 px-4 py-2 cursor-pointer"
        >
          <img src="/icons/logout.svg" alt='logout button' className='w-[16px]'/>
          <p className="text-base font-bold text-gray-300">
            로그아웃
          </p>
        </div>

      </div>
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileImageChange}
        />
        <img
          src={profileImage}
          alt="User profile image"
          className="w-[165px] h-[165px] absolute left-[30px] top-[124px] rounded-2xl object-cover"
        />
      </label>
      <div className="absolute left-[210px] top-[224px] inline-flex items-center gap-2 z-10">
        {isEditingName ? (
          <input
            className={`text-3xl font-bold text-left text-white rounded bg-transparent border-b border-white font-mono whitespace-nowrap px-1`}
            style={{ width: `${nickname.length * 1.6 + 2}ch` }}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={handleNicknameSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleNicknameSave();
              }
            }}
            autoFocus
            maxLength={10}
          />
        ) : (
          <p
            className="text-3xl font-semibold text-left text-white rounded bg-transparent font-mono whitespace-nowrap w-fit min-w-0 w-auto"
          >
            {nickname}
          </p>
        )}
        {!isEditingName && (
          <button onClick={() => setIsEditingName(true)} aria-label="Edit nickname" className="bg-white/50 p-1.5 rounded-full z-10">
            <img src={"icons/edit.svg"} alt='edit nickname' width={12} height={12} />
          </button>
        )}
      </div>
      <p className="w-[310px] h-[21px] absolute left-[210px] top-[260px] text-lg font-semibold text-left text-white">
        {session?.user?.email ?? 'madcamp_week2@kaist.co.kr'}
      </p>
        <div className="flex flex-col w-full px-4 pt-104 overflow-hidden">  
          <div className="flex flex-row items-center gap-2 w-[305px] h-[32px] left-2.5 top-0">
            <img src={"icons/clock.svg"} alt='finger heart' width={28} height={28} />
            <p className="left-[35px] top-0 text-xl text-left font-bold text-white">
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
      <div className="flex flex-col pt-10 absolute left-[30px] top-[276px] text-3xl font-semibold text-left text-white">
        <p>Tags</p>
        <div className="flex justify-start items-center pt-2.5 gap-2">
        {['SF', 'Action', 'Fantasy', 'Horror', 'Anime', 'melodrama','drama'].map(tag => (
          <div
            key={tag}
            className="flex justify-center items-center relative px-[8px] py-[2px] rounded-[8px] bg-white/50 border border-black/20"
          >
            <p className="text-[16px] font-bold text-left text-black">#{tag}</p>
          </div>
        ))}
      </div>
      </div>

    </div>
  );
}