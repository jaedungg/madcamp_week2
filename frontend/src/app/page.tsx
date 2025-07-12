'use client';

import { useState } from 'react';
import axios from 'axios';
import LoginButton from './components/LoginButton'
import UserProfile from './components/UserProfile';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WhiteButton from './components/WhiteButton';
import MovieVerticalView from './components/\bMovieVerticalGallery';


export default function Home() {
  const [story, setStory] = useState('');
  const [result, setResult] = useState('');
  const { data: session } = useSession();
  console.log("현재 세션:", session);

  const generate = async () => {
    const res = await axios.post('http://localhost:5000/api/summarize', { text: story });
    setResult(res.data.summary);
  };

  const router = useRouter();

  const goToDetail = () => {
    router.push(`/movie/11`);
  };

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
          <WhiteButton icon="document" text="영화 상세 페이지" />
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
        <MovieVerticalView movieIds={[9,8,7,6,5,4,3,2,1]} />
      </div>
      
      <h1 className="text-2xl font-bold mb-40">영화 줄거리 요약기</h1>
      <LoginButton />
      <UserProfile />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}


// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
