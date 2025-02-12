// * main.js의 main 함수 불러오기
const mainJs = require('./main');
// * http 불러오기
const http = require('http');

// * server 생성하기
const server = http.createServer(function(request, response) {
  if(request.method === "GET") {
    if(request.url === "/") {
      mainJs.main();
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.end();
    }
  }
  if(request.method === "POST") {

  }
});

const port = 3000; // port 번호에 대한 정의
// * server 오픈하기
server.listen(port, function() {
  console.log("현재 " + port + "번의 서버가 오픈되었습니다.");
  console.log("사이트를 눌러 확인해주십시오. http://localhost:"+ port);
})