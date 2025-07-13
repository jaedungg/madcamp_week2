// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    console.warn("❌ JWT 인증 헤더 없음");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    req.user = decoded; // 사용자 정보 저장
    next();
  } catch (err) {
    console.error("❌ JWT 검증 실패:", err.message);
    return res.status(403).json({ message: "Forbidden" });
  }
};