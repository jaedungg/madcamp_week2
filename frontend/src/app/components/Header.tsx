'use client';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
    };

    const move2Home = () => {
      router.push('/');
    };
  
    const move2MoviePage = (step: number) => {
      router.push(`/movie/1`);
    };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.66) 40%, rgba(0, 0, 0, 0.34) 70%, rgba(0, 0, 0, 0) 100%)",
      }}
    >
      {/* 왼쪽 메뉴 */}
      <div className="flex items-center gap-4 text-lg">
        <div className="flex items-center gap-2 px-2 cursor-pointer" onClick={() => move2Home()}>          
          <img src="/icons/logo.svg" alt="Globe Icon" width={32} height={32} />
          <p className="text-2xl cursor-pointer">ReelRecap</p>
        </div>
        <p className={`cursor-pointer ${(pathname == '/') ? "font-bold" : ""}`} onClick={() => move2Home()}>Home</p>
        <p className={`cursor-pointer ${(pathname?.startsWith('/movie')) ? "font-bold" : ""}`} onClick={() => move2MoviePage(1)}>Movie</p>
        <p className={`cursor-pointer ${(pathname?.startsWith('/comic')) ? "font-bold" : ""}`} onClick={() => move2Home()}>Anime</p>
      </div>

      {/* 오른쪽 메뉴 */}
      <div className="flex items-center gap-4">
        {/* 검색 아이콘 */}
        <div className='flex items-center gap-2'>
          {isSearchOpen && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="px-2 border rounded"
            /> 
          )}
          <img className="cursor-pointer" src="/icons/search.svg" alt="Globe Icon" width={32} height={32} onClick={toggleSearch}/>
        </div>
        {/* 프로필 원 */}
        <img className="cursor-pointer rounded-full " src="/images/profile.png" alt="Globe Icon" width={32} height={32} />
      </div>
    </header>
  );
}
