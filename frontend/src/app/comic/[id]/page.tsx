'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';

import { useState, useEffect, useRef } from 'react';

export default function ComicPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params?.id ?? 'unknown';
  const step = searchParams ? searchParams.get('step') : null;

  const [scenes, setScenes] = useState<{ image: string; title: string; description: string }[]>([]);

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await fetch(`/data/${id}_${step}.json`);
        const data = await response.json();
        setScenes(data);
      } catch (error) {
        console.error('Error fetching scenes:', error);
      }
    };

    if (id && step) {
      fetchScenes();
    }
  }, [id, step]);

  const totalScenes = scenes.length;

  const [current, setCurrent] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePrev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () => setCurrent((prev) => (prev < totalScenes - 1 ? prev + 1 : prev));

  useEffect(() => {
    if (!id || !step || scenes.length === 0) return;

    const ttsPath = `/tts/${id}_${step}_${current + 1}.mp3`;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ttsPath;
      audioRef.current.load();
      if (isClicked) {
        audioRef.current.play().catch((err) => console.error("TTS play error:", err));
      }
    }
  }, [current, id, step, scenes, isClicked]);

  return (
    <div className="w-full min-h-screen h-screen overflow-hidden bg-black mx-auto px-4">
      <audio ref={audioRef} />
      <div className="flex justify-center items-center w-[54px] h-[54px] absolute left-1 top-1 gap-2.5 cursor-pointer z-10 hover:bg-white/30 transition-colors duration-200 group rounded-full" onClick={() => router.push(`/movie/${id}`)}>
        <svg
          width={54}
          height={54}
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-[54px] h-[54px] text-[#DFD5D5] group-hover:text-white"
          preserveAspectRatio="none"
        >
          <path
            d="M31.9133 17.9667L30.145 16.2L20.5133 25.8283C20.3581 25.9826 20.2349 26.1661 20.1508 26.3681C20.0667 26.5702 20.0234 26.7869 20.0234 27.0058C20.0234 27.2247 20.0667 27.4414 20.1508 27.6435C20.2349 27.8456 20.3581 28.029 20.5133 28.1833L30.145 37.8167L31.9117 36.05L22.8717 27.0083L31.9133 17.9667Z"
            fill="currentColor"
          />
        </svg>
      </div>
          <div
    className="flex justify-start items-center absolute right-4 top-4 gap-2.5 z-10 cursor-pointer p-1"
    onClick={() => setIsClicked(!isClicked)}
  >
    {isClicked ? (
      <svg
        width={45}
        height={45}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-grow-0 flex-shrink-0 w-[45px] h-[45px]"
        preserveAspectRatio="none"
      >
        <circle cx={28} cy={28} r={27} fill="#ABABAB" fillOpacity="0.7" stroke="white" />
        <path
          d="M12.6914 31.2393C12.1081 30.2678 11.8 29.1559 11.8 28.0227C11.8 26.8895 12.1081 25.7776 12.6914 24.806C12.8706 24.5069 13.1104 24.2485 13.3955 24.0476C13.6805 23.8467 14.0044 23.7076 14.3464 23.6393L17.168 23.0743C17.3363 23.041 17.4881 22.951 17.598 22.8193L21.0447 18.681C23.0147 16.3143 24.0014 15.1327 24.8797 15.451C25.758 15.7693 25.7614 17.3093 25.7614 20.3893V35.6593C25.7614 38.7377 25.7614 40.276 24.8814 40.596C24.003 40.9127 23.0164 39.731 21.0464 37.366L17.5947 33.226C17.4852 33.0947 17.334 33.0047 17.1664 32.971L14.3447 32.406C14.0027 32.3377 13.6788 32.1987 13.3938 31.9977C13.1088 31.7968 12.8706 31.5385 12.6914 31.2393Z"
          stroke="white"
        />
        <path
          d="M33.3214 22.1294C34.8765 23.6843 35.7538 25.791 35.7622 27.9901C35.7707 30.1892 34.9095 32.3025 33.3664 33.8694M40.1897 18.5944C42.6778 21.0821 44.0817 24.4525 44.0954 27.9709C44.1091 31.4893 42.7316 34.8706 40.2631 37.3777"
          stroke="white"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
        width={45}
        height={45}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-grow-0 flex-shrink-0 w-[45px] h-[45px]"
        preserveAspectRatio="none"
      >
        <circle cx={28} cy={27.5621} r={27} fill="#ABABAB" fillOpacity="0.7" stroke="white" />
        <path
          d="M13.8913 30.4015C13.3081 29.4299 13 28.318 13 27.1849C13 26.0517 13.3081 24.9398 13.8913 23.9682C14.0705 23.669 14.3104 23.4107 14.5954 23.2098C14.8804 23.0089 15.2043 22.8698 15.5463 22.8015L18.368 22.2365C18.5363 22.2032 18.688 22.1132 18.798 21.9815L22.2446 17.8432C24.2146 15.4765 25.2013 14.2949 26.0796 14.6132C26.958 14.9315 26.9613 16.4715 26.9613 19.5515V34.8215C26.9613 37.8999 26.9613 39.4382 26.0813 39.7582C25.203 40.0749 24.2163 38.8932 22.2463 36.5282L18.7946 32.3882C18.6851 32.2568 18.534 32.1669 18.3663 32.1332L15.5446 31.5682C15.2027 31.4999 14.8788 31.3608 14.5937 31.1599C14.3087 30.959 14.0705 30.7007 13.8913 30.4015Z"
          stroke="white"
        />
        <path
          d="M33.628 32.1849L43.628 22.1849M43.628 32.1849L33.628 22.1849"
          stroke="white"
          strokeLinecap="round"
        />
      </svg>
    )}
  </div>
      <div className="w-full max-w-screen-lg mx-auto pt-16 relative h-full">
        {current > 0 && (
          <div className="flex justify-center items-center w-[54px] h-[55px] absolute left-8 top-[calc(45%-27px)] gap-2.5 cursor-pointer z-10" onClick={handlePrev}>
            <svg width={54} height={55} viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx={27} cy="27.5" r={27} fill="white" fillOpacity="0.6" />
              <path d="M31.9133 18.4667L30.145 16.7L20.5133 26.3283C20.3581 26.4826 20.2349 26.6661 20.1508 26.8681C20.0667 27.0702 20.0234 27.2869 20.0234 27.5058C20.0234 27.7247 20.0667 27.9414 20.1508 28.1435C20.2349 28.3456 20.3581 28.529 20.5133 28.6833L30.145 38.3167L31.9117 36.55L22.8717 27.5083L31.9133 18.4667Z" fill="black" />
            </svg>
          </div>
        )}

        <div className="flex flex-col justify-center items-start gap-8 max-w-screen-md mx-auto">
          <div className="w-full flex relative justify-center max-w-screen-md overflow-hidden pb-4 rounded-xl">
            <img
              src={scenes[current]?.image}
              className=" max-h-[60vh] object-cover rounded-xl"
              alt="scene"
            />
            <div className="absolute bottom-[4px] left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-2">
              {[...Array(scenes.length)].map((_, i) => (
                <svg
                  key={i}
                  width={8}
                  height={8}
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-grow-0 flex-shrink-0"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <circle cx={4} cy={4} r={4} fill={i === current ? 'white' : 'white'} fillOpacity={i === current ? 1 : 0.5} />
                </svg>
              ))}
            </div>
          </div>
          <div className="w-full max-w-screen-md mt-4">
            <p className="text-2xl font-semibold text-left text-white">
              {scenes[current]?.title}
            </p>
            <p className="text-lg font-medium text-left text-white whitespace-pre-line mt-2">
              {scenes[current]?.description}
            </p>
          </div>
        </div>

        {current < totalScenes - 1 && (
          <div className="flex justify-center items-center w-[54px] h-[55px] absolute right-8 top-[calc(45%-27px)] gap-2.5 cursor-pointer z-10" onClick={handleNext}>
            <svg width={54} height={55} viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx={27} cy="27.5" r={27} fill="white" fillOpacity="0.6" />
              <path d="M22.0866 18.4667L23.855 16.7L33.4866 26.3283C33.6419 26.4826 33.7651 26.6661 33.8492 26.8681C33.9333 27.0702 33.9766 27.2869 33.9766 27.5058C33.9766 27.7247 33.9333 27.9414 33.8492 28.1435C33.7651 28.3456 33.6419 28.529 33.4866 28.6833L23.855 38.3167L22.0883 36.55L31.1283 27.5083L22.0866 18.4667Z" fill="black" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
