import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    "/",               // 메인 페이지
    "/profile/:path*",  // 마이페이지
    "/comic/:path*",   // 10컷 만화 등
    "/movie/:path*",   // 영화 상세 등
  ],
};