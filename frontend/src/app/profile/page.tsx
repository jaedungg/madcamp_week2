'use client';

import MovieVerticalView from '../components/MovieVerticalGallery';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, use } from 'react';
import{ updateUserProfile, getMyProfile } from '../../../lib/api';
import { useProfileStore } from '../../../store/profileStore';
import TagEditor from '../components/TagEditor';


export default function ProfilePage() {
  const { data: session } = useSession();
  const [coverImage, setCoverImage] = useState<string>('/images/background.png');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nickname, setNickname] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [recentViewedIds, setRecentViewedIds] = useState<number[]>([]);
  const profileImage = useProfileStore((state) => state.profileImage);
  const setProfileImage = useProfileStore((state) => state.setProfileImage);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (session?.user?.id) {
          const profile = await getMyProfile(session.user.id);
          console.log("✅ useEffect 실행: 프로필 불러오기", profile?.tag);
          if (profile?.nickname) {
            setNickname(profile.nickname);
          }
          if (profile?.bannerImage) {
            setProfileImage(profile.profileImage || '/images/profile.png');
          }
          if (profile?.bannerImage) {
            setCoverImage(profile.bannerImage);
          }
          if (profile?.favoriteGenres) {
            setTags(profile.favoriteGenres);
          }
          if (profile?.recentMovies && Array.isArray(profile.recentMovies)) {
            setRecentViewedIds(profile.recentMovies);
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

  const handleTagSave = async () => {
    if (session?.user?.id && tags.length > 0) {
      console.log("🪄 저장할 태그:", tags);
      await updateUserProfile(session.user.id, { favoriteGenres: tags });
      setIsEditingTags(false);
    }
  };
  useEffect(() => { 
    if (!isEditingTags) {
      handleTagSave()
    }
  }, [isEditingTags]);

  return (
    <div className="w-full px-6 relative min-h-screen relative overflow-x-hidden bg-black mx-auto px-4 pb-8">
      <label className="cursor-pointer z-10">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverImageChange}
        />
        <img
          src={coverImage}
          className="z-10 w-full h-[200px] absolute left-1/2 -translate-x-1/2 object-cover"
          alt="Cover"
        />
      </label>


      <div className='w-full flex flex-col pt-34 z-30 items-start justify-start'>
        <div className='flex w-full z-10 flex-row justify-between items-end'>
          {/* Profile */}
          <div className='flex flex-row items-end gap-4 z-10x'>
            {/* Profile Image */}
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
                className="w-[165px] h-[165px] rounded-2xl object-cover"
              />
            </label>
            {/* name & email */}
            <div className='flex flex-col items-start justify-start gap-1.5 pb-2'>
              <div className="inline-flex items-center gap-2.5 ">
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
                  <p className="text-3xl font-semibold text-left text-white rounded bg-transparent font-mono whitespace-nowrap w-fit min-w-0 w-auto">
                    {nickname}
                  </p>
                )}
                {!isEditingName && (
                <button onClick={() => setIsEditingName(true)} aria-label="Edit nickname" className="bg-white/20 p-1.5 rounded-full hover:bg-white/40 transition-colors duration-200">
                  <img src={"icons/edit.svg"} alt='edit nickname' width={12} height={12} />
                </button>
                )}
              </div>
              <p className="text-[20px] font-semibold text-left text-white">
                {session?.user?.email ?? 'madcamp_week2@kaist.co.kr'}
              </p>
            </div>
          </div>
          {/* Logout button */}
          <div
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-1 mb-1 rounded-md bg-white/40 border border-white/40 hover:bg-white/20 hover:border-white/80 transition-all duration-200 px-4 py-1.5 cursor-pointer"
          >
            <img src="/icons/logout.svg" alt='logout button' className='w-[16px]'/>
            <p className="text-base font-bold text-gray-300">
              로그아웃
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-8'>
        {/* Tag */}
        <div className="flex flex-col pt-8 text-3xl font-semibold text-left text-white">
          <div className='flex flex-row items-center gap-2.5'>
            <p>Tags</p>
            <button
              onClick={() => setIsEditingTags(true)}
              className="bg-white/20 p-1.5 rounded-full hover:bg-white/40 transition-colors duration-200"
              aria-label="Edit tags"
              >
              <img src="icons/edit.svg" alt="edit tags" width={12} height={12} />
            </button>
          </div>

          <div className="flex flex-wrap w-full justify-start items-center pt-2.5 gap-2">
            {tags.map(tag => (
              <div
              key={tag}
              className="flex justify-center items-center relative px-[8px] py-[4px] rounded-lg bg-white/50 border border-black/20"
              >
                <p className="text-[16px] text-left text-black">#{tag}</p>
              </div>
            ))}
          </div>
        </div>

        <TagEditor
          tags={tags}
          setTags={setTags}
          isEditingTags={isEditingTags}
          setIsEditingTags={setIsEditingTags}
        />

        {/* Title & Movie gallery view */}
        <div className="flex flex-col w-full overflow-hidden">  
          <div className="flex flex-row items-center gap-2">
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

      </div>
  </div>
  );
}
