// checkDB.js
const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ DB 연결 OK');
    process.exit(0); // 정상 종료
  } catch (err) {
    console.error('❌ DB 연결 실패:', err.message);
    process.exit(1); // 오류로 종료
  }
})();