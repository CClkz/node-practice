// routes/users.js
const express = require('express');
const router = express.Router();

// 处理 /users 路径的 GET 请求
router.get('/', (req, res) => {
  res.send('User list');
});

// 处理 /users/:id 路径的 GET 请求
router.get('/:id', (req, res) => {
  res.send(`User details for user with ID: ${req.params.id}`);
});

module.exports = router;
