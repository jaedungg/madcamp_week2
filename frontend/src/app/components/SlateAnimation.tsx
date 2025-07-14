"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SlateAnimation() {
  const [show, setShow] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

   const { status } = useSession();

useEffect(() => {
  if (status === "authenticated") {
    setShow(true);
    setTimeout(() => setIsClosed(true), 1000);
    setTimeout(() => setShow(false), 1800);
  }
}, [status]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in">
      <img
        src={isClosed ? "/icons/login_icon_close.svg" : "/icons/login_icon.svg"}
        alt="슬레이트"
        className="w-[200px] h-[200px] object-contain transition-all duration-700 ease-in-out"
      />
    </div>
  );
}