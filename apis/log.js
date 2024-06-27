// const http = require('http');

// http.createServer((req, res) => {
//   console.log('Request received');
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello, World!\n');
// }).listen(8000);

console.log('Server running at http://127.0.0.1:8000/');

// linux下可直接node log.js > output.log,windows报错stdout is not a tty
// node log.js > output.log 2>&1, 2-标准错误,2>&1 标准错误重定向到标准输出
// 使用nohup忽略关闭终端的信号
// nohup node log.js > output.log
// taskkill /PID <PID> /F


