'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { usePathname } from 'next/navigation';
import SessionProviderWrapper from "./SessionProviderWrapper";
import SlateAnimation from "./components/SlateAnimation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const showSlate = pathname === '/';

  const showHeader = pathname !== '/login' && !(pathname?.startsWith('/comic/'));

  return (
    <html lang="en">
      <SessionProviderWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} scrollbar-hide antialiased overflow-x-hidden`}
        >
          <div className="flex flex-col w-full min-h-screen scrollbar-hide bg-black">
            {showSlate && <SlateAnimation />}
            {showHeader && <Header />}
            {children}
          </div>
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
