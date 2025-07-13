import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { prompt: "select_account" },
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise), // 사용자 정보는 DB에 저장됨
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // JWT 기반 세션 사용
  },
  jwt: {
    encryption: false,
    // secret: process.env.NEXTAUTH_SECRET,
  },
  // pages: {
  //   error: "/auth", // 에러 페이지 경로
  // },
  callbacks: {
    async jwt({ token, user }) {
      // JWT 토큰에 사용자 정보를 추가
      if (user) {
        token.id = user.id
        token.email = user.email
        // token.name = user.name
      }
      console.log("JWT 콜백:", token)
      return token
    },
    async session({ session, token }) {
      // 세션에 JWT 토큰 정보를 추가
      if (token?.id) {
        session.user.id = token.id;
      }
      // session.user.id = token.id
      // session.user.email = token.email
      console.log("세션 콜백:", session);
      return session
    },
    async signIn({ user }) {
      try {
        const client = await clientPromise;
        if (!client) {
          throw new Error("clientPromise 반환 실패");
        }

        const db = client.db();
        const existingUser = await db.collection("users").findOne({ email: user.email });

        // if (!existingUser) {
        //   console.log("❌ 신규 유저 로그인 차단:", user.email);
        //   return false;
        // }

        console.log("✅ 기존 유저 로그인 허용:", user.email);
        return true;
      } catch (error) {
        console.error("DB 오류:", error);
        return false;
      }
    }
  },
})
