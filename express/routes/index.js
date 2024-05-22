// routes/index.js
const express = require('express');
const router = express.Router();

// 处理根路径的 GET 请求
router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
