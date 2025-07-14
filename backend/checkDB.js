// checkDB.js
import mongoose from 'mongoose';
import 'dotenv/config'; // .env 파일을 자동으로 로드

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ DB 연결 OK');
    process.exit(0); // 정상 종료
  } catch (err) {
    console.error('❌ DB 연결 실패:', err.message);
    console.error(process.env.MONGO_URI);
    process.exit(1); // 오류로 종료
  }
})();