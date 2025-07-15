import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao"; // ✅ 추가
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { prompt: "select_account" },
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,          // ✅ REST API 키
      clientSecret: process.env.KAKAO_CLIENT_SECRET,  // ✅ Client Secret 필수
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  jwt: {
    encryption: false,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      const client = await clientPromise;
      const db = client.db();
      const dbUser = await db.collection("users").findOne({ email: token.email });

      if (dbUser) {
        token.nickname = dbUser.nickname || dbUser.name;
    
        // nickname 없으면 DB에 저장
        if (!dbUser.nickname) {
          const nickname = dbUser.name;
          await db.collection("users").updateOne(
            { email: token.email },
            { $set: { nickname } }
          );
          token.nickname = nickname;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // 세션에 JWT 토큰 정보를 추가
      if (token?.id) {
        session.user.id = token.id;
        // session.user.nickname = token.nickname || token.name; // nickname이 없으면 name 사용
      }
      console.log("세션 콜백:", session);
      return session;
    },
    async signIn({ user, account }) {
      try {
        const client = await clientPromise;
        const db = client.db();
        const existingUser = await db.collection("users").findOne({ email: user.email });

        if (!existingUser) {
          console.log("✅✅✅ 신규 유저 로그인:", user.email);
        } else {
          console.log("✅✅✅ 기존 유저 로그인:", user.email);
        }

        return true;
      } catch (error) {
        console.error("DB 오류:", error);
        return false;
      }
    },
  },
});
