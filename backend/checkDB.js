// checkDB.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // 명시적 경로 지정

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ DB 연결 OK');
  process.exit(0);
} catch (err) {
  console.error('❌ DB 연결 실패:', err.message);
  process.exit(1);
}