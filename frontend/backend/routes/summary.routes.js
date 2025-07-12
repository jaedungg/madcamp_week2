const express = require('express');
const router = express.Router();

// 요약 API
router.post('/', async (req, res) => {
  const { text } = req.body;
  // 추후 GPT API 연동 예정
  res.json({ summary: `[요약됨] ${text.slice(0, 50)}...` });
});

module.exports = router;
