const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// app 객체는 먼저 선언해야 합니다
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// 미들웨어 등록
app.use(cors());
app.use(express.json());

// Swagger UI 연결
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API 라우트 등록
app.use('/api/comics', require('./routes/comic.routes'));
// app.use('/api/users', require('./routes/user.routes'));

// MongoDB 연결 및 서버 실행
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5050, () => {
      console.log('✅ 서버 실행 중: http://localhost:5050');
      console.log('📘 Swagger 문서: http://localhost:5050/api-docs');
    });
  })
  .catch((err) => console.error('❌ MongoDB 연결 실패:', err));
