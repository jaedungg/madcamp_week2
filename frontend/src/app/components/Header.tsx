'use client';
import { useSession, signOut } from 'next-auth/react'
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState , useEffect} from 'react';
import { searchMovies, getMovieDetails } from '../../../lib/api';


export default function Header() {
    const { data: session, status } = useSession()
    const { user } = session || {};

    const router = useRouter();
    const pathname = usePathname();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    interface MovieResult {
      title: string;
      poster_path?: string;
      // 필요한 필드를 여기에 추가
    }
    const [searchResults, setSearchResults] = useState<MovieResult[]>([]);

    const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
    };

    const move2Home = () => {
      router.push('/');
    };
  
    const move2MoviePage = (step: number) => {
      router.push(`/movie/1`);
    };

    useEffect(() => {
      const fetchResults = async () => {
        try {
          console.log("검색어:", searchQuery);  // 검색어 로그
          const results = await searchMovies(searchQuery);
          console.log("검색 결과:", results);  // 결과 로그
          setSearchResults(results);
        } catch (err) {
          console.error("검색 중 오류 발생:", err);
        }
      };

      if (searchQuery) {
        fetchResults();
      } else {
        setSearchResults([]);
      }
    }, [searchQuery]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.66) 40%, rgba(0, 0, 0, 0.34) 70%, rgba(0, 0, 0, 0) 100%)",
      }}
    >
      {/* 왼쪽 메뉴 */}
      <div className="flex items-center text-lg">
        <div className="flex items-center gap-2 px-2 cursor-pointer" onClick={() => move2Home()}>
          <img src="/icons/logo2.svg" alt="Globe Icon" className="h-8 object-contain pt-[2px]" />
        </div>
        <div className="flex items-center gap-2">
          <p className={`pt-[6px] cursor-pointer ${(pathname == '/') ? 'font-bold' : ''}`} onClick={move2Home}>Home</p>
          <p className={`pt-[6px] cursor-pointer ${(pathname?.startsWith('/movie')) ? 'font-bold' : ''}`} onClick={() => move2MoviePage(1)}>Movie</p>
          <p className={`pt-[6px] cursor-pointer ${(pathname?.startsWith('/comic')) ? 'font-bold' : ''}`} onClick={move2Home}>Anime</p>
        </div>
      </div>

      {/* 오른쪽 메뉴 */}
      <div className="relative flex items-center gap-4">
        {/* 검색 아이콘 */}
        <div className='flex items-center gap-2'>
          {isSearchOpen && (
            <>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  console.log("입력된 검색어:", e.target.value);
                  setSearchQuery(e.target.value);
                }}
                placeholder="검색어를 입력하세요"
                className="px-2 border rounded"
              /> 
              <div className="absolute top-12 right-0 z-50">
                <div className="flex flex-col justify-start items-start w-[328px] relative gap-2.5 px-3 py-2.5 rounded-lg bg-black/[0.84]">
                  {searchResults.map((movie, i) => (
                      <div key={i} className="self-stretch flex-grow-0 flex-shrink-0 h-[68px] relative">
                        <img
                          src={movie.poster_path 
                            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` 
                            : "rectangle-19.png"}
                          className="w-12 h-[68px] absolute left-[-1px] top-[-1px] rounded object-contain"
                        />
                        <p className="absolute left-[60px] top-[27px] text-xs text-left text-white">
                          {movie.title}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
          <img className="cursor-pointer" src="/icons/search.svg" alt="Globe Icon" width={32} height={32} onClick={toggleSearch}/>
        </div>
        {/* 프로필 원 */}
        <div onClick={() => router.push('/profile')}>
          <img 
            className="cursor-pointer rounded-full" 
            src={user?.image ?? "/images/profile.png"}
            alt="Profile image" width={32} height={32} />
        </div>
      </div>
    </header>
  );
}
