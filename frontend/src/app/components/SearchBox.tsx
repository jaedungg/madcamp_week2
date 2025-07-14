export default function SearchBox() {
  return (
    <div className="flex flex-col justify-start items-start w-[328px] relative gap-2.5 px-3 py-2.5 rounded-lg bg-black/[0.84]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="self-stretch flex-grow-0 flex-shrink-0 h-[68px] relative">
          <img
            src="rectangle-19.png"
            className="w-12 h-[68px] absolute left-[-1px] top-[-1px] rounded object-contain"
          />
          <p className="absolute left-[60px] top-[27px] text-xs text-left text-white">
            극장판 주술회전 0
          </p>
        </div>
      ))}
    </div>
  );
} 