const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 라우트 등록
app.use('/api/summarize', require('./routes/summary.routes'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log('✅ Backend running on http://localhost:5000'));
  })
  .catch(err => console.error('MongoDB 연결 실패:', err));
