'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

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

  const handlePrev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () => setCurrent((prev) => (prev < totalScenes - 1 ? prev + 1 : prev));

  return (
    <div className="w-full min-h-screen h-screen overflow-hidden bg-black mx-auto px-4">
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
      <div className="w-full max-w-screen-lg mx-auto pt-16 relative h-full">
        {current > 0 && (
          <div className="flex justify-center items-center w-[54px] h-[55px] absolute left-8 top-[calc(50%-27px)] gap-2.5 cursor-pointer z-10" onClick={handlePrev}>
            <svg width={54} height={55} viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx={27} cy="27.5" r={27} fill="white" fillOpacity="0.6" />
              <path d="M31.9133 18.4667L30.145 16.7L20.5133 26.3283C20.3581 26.4826 20.2349 26.6661 20.1508 26.8681C20.0667 27.0702 20.0234 27.2869 20.0234 27.5058C20.0234 27.7247 20.0667 27.9414 20.1508 28.1435C20.2349 28.3456 20.3581 28.529 20.5133 28.6833L30.145 38.3167L31.9117 36.55L22.8717 27.5083L31.9133 18.4667Z" fill="black" />
            </svg>
          </div>
        )}

        <div className="flex flex-col justify-center items-start gap-8 max-w-screen-md mx-auto">
          <div className="w-full relative max-w-screen-md overflow-hidden pb-4">
            <img
              src={scenes[current]?.image}
              className="w-full max-h-[60vh] object-contain rounded-lg"
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
          <div className="flex justify-center items-center w-[54px] h-[55px] absolute right-8 top-[calc(50%-27px)] gap-2.5 cursor-pointer z-10" onClick={handleNext}>
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
