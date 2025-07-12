// 예: frontend/pages/index.js
import { useSession, signIn, signOut } from "next-auth/react";
햣
export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>환영합니다, {session.user.name}</p>
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }

  return (
    <>
      <p>로그인이 필요합니다.</p>
      <button onClick={() => signIn("google")}>Google로 로그인</button>
    </>
  );
}