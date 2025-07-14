'use client';

import MovieVerticalGallery from '../components/MovieVerticalGallery';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [coverImage, setCoverImage] = useState<string>('/images/banner.jpg');

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-[832px] relative overflow-hidden bg-black mx-auto px-4">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverImageChange}
        />
        <img
          src={coverImage}
          className="w-full max-w-[1217px] h-[165px] absolute left-1/2 -translate-x-1/2 top-[31px] rounded-2xl object-cover"
          alt="Cover"
        />
      </label>
      {/* Logout button at bottom-right of cover image area */}
      <div className="absolute right-[40px] top-[210px] pt-1">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-[82px] h-7 relative rounded-lg bg-white/[0.33] border border-white/[0.51] cursor-pointer hover:bg-white/50 transition p-1"
        >
          <p className="absolute left-[26px] top-[7px] text-xs font-medium text-left text-[#c2bfbf]">
            로그아웃
          </p>
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 absolute left-2.5 top-2"
            preserveAspectRatio="none"
          >
            <path
              d="M2.5 10.5C2.225 10.5 1.98967 10.4022 1.794 10.2065C1.59833 10.0108 1.50033 9.77533 1.5 9.5V2.5C1.5 2.225 1.598 1.98967 1.794 1.794C1.99 1.59833 2.22533 1.50033 2.5 1.5H6V2.5H2.5V9.5H6V10.5H2.5ZM8 8.5L7.3125 7.775L8.5875 6.5H4.5V5.5H8.5875L7.3125 4.225L8 3.5L10.5 6L8 8.5Z"
              fill="#C2BFBF"
            />
          </svg>
        </button>
      </div>
      <img
        src={session?.user?.image ?? '/images/profile.png'}
        alt="User profile image"
        className="w-[145px] h-[145px] absolute left-[82px] top-[124px] rounded-2xl object-cover"
      />
      <p className="w-[158px] h-9 absolute left-[244px] top-[211px] text-3xl font-semibold text-left text-white">
        {session?.user?.name ?? 'UserName'}
      </p>
      <p className="w-[310px] h-[21px] absolute left-[244px] top-[247px] text-sm font-semibold text-left text-white">
        {session?.user?.email ?? 'madcamp_week2@kaist.co.kr'}
      </p>
    <div className="w-full h-[508px] absolute left-1/2 -translate-x-1/2 top-[416px] overflow-hidden px-4">
        <div className="w-[305px] h-9 absolute left-[91px] top-0">
          <p className="absolute left-[35px] top-0 text-3xl font-bold text-left text-white">
            최근 본 영화 리스트
          </p>
          <svg
            width={23}
            height={32}
            viewBox="0 0 23 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[-1.25px] top-[1.75px]"
            preserveAspectRatio="none"
          >
            <path
              d="M9.40729 11.5421L2.80401 4.92373C2.37678 4.49104 2.13872 3.90649 2.14209 3.29843C2.14547 2.69036 2.39 2.10849 2.82201 1.68057C3.03306 1.46653 3.28427 1.29624 3.56124 1.17946C3.83822 1.06268 4.13552 1.00171 4.4361 1.00004C4.73668 0.998363 5.03464 1.05602 5.31289 1.16971C5.59115 1.2834 5.84424 1.45089 6.05765 1.66257L17.7371 13.2507C21.7243 17.2469 24.0224 22.4851 19.5717 27.8974L19.0977 28.3729C18.2672 29.2057 17.2806 29.8664 16.1943 30.3172C15.108 30.768 13.9435 31 12.7674 31C11.5914 31 10.4268 30.768 9.34057 30.3172C8.25431 29.8664 7.26767 29.2057 6.43717 28.3729L1.65496 23.6477C0.765427 22.7581 0.784929 21.2956 1.69547 20.382C2.558 19.5165 3.91556 19.455 4.8111 20.2095M9.40729 11.5421L13.1725 15.3133M9.40729 11.5421C8.51776 10.651 7.02219 10.672 6.10715 11.5886C5.19061 12.5066 5.16961 13.9722 6.05765 14.8617L7.1497 15.9568M4.8111 20.2095L3.87356 19.2975C2.98402 18.4064 3.00652 16.9408 3.92156 16.0243C4.8366 15.1077 6.26166 15.0657 7.1497 15.9568M4.8111 20.2095L6.50617 21.8596M4.8111 20.2095C4.8611 20.2515 4.9086 20.2955 4.95361 20.3415M7.1497 15.9568L9.82581 18.6374M11.7039 7.26535C11.9559 4.95973 14.686 2.57011 18.0942 4.2067C18.4182 4.3627 18.6747 4.65672 18.6792 5.01674C18.6822 5.59577 18.4287 6.3113 17.6126 6.78683C16.4456 7.46486 14.536 10.057 17.0861 12.6146"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="w-full overflow-x-auto mt-[57px] pl-[91px]">
          <div className="flex gap-2 min-w-fit">
            <MovieVerticalGallery movieIds={[0,1,2,3,4,5,6,7,8,9]} />
          </div>
        </div>
      </div>
      <p className="w-[85px] h-9 absolute left-[93px] top-[276px] text-3xl font-semibold text-left text-white">
        Tags
      </p>
      <div className="flex justify-start items-center absolute left-[91px] top-[318px] gap-2.5">
        {['SF', 'Action', 'Fantasy', 'Horror', 'Anime', 'melodrama','drama'].map(tag => (
          <div
            key={tag}
            className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-5 relative px-[5px] py-[3px] rounded-[10px] bg-white/50 border border-black/20"
          >
            <p className="flex-grow-0 flex-shrink-0 text-[10px] font-medium text-left text-black">#{tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
}