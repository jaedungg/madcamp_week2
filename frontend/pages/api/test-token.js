// 로그인 인증 토큰 테스트용 API

import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    // raw: false ← 평문 객체로 받기
  });

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  // 직접 평문 JWT 생성
  delete token.exp; 
  
  const signedJWT = jwt.sign(token, process.env.NEXTAUTH_SECRET, {
    algorithm: "HS256",
    expiresIn: "30d", // 적절히 조절
  });

  console.log("✅ 직접 생성한 JWT:", signedJWT);
  res.status(200).json({ token: signedJWT });
}
