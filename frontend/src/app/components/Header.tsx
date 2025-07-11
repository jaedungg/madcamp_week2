'use client';

export default function Header() {
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
        <div className="flex items-center gap-2 px-2 cursor-pointer">          
          <img src="/images/logo.svg" alt="Globe Icon" width={32} height={32} />
          <p className="text-2xl cursor-pointer">ReelRecap</p>
        </div>
        <p className="cursor-pointer">Home</p>
        <p className="cursor-pointer">Movie</p>
        <p className="cursor-pointer">Anime</p>
      </div>

      {/* 오른쪽 메뉴 */}
      <div className="flex items-center gap-4">
        {/* 검색 아이콘 */}
        <img className="cursor-pointer" src="/images/search.svg" alt="Globe Icon" width={32} height={32} />

        {/* 프로필 원 */}
        <img className="cursor-pointer rounded-full " src="/images/profile.png" alt="Globe Icon" width={32} height={32} />
      </div>
    </header>
  );
}
