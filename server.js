const http = require('http');
const fs = require('fs');
const lodash = require('lodash')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  console.log(lodash.random(0,20));

  let path = './public/';
  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  if (req.url !== '/about-me') {
    fs.readFile(path, (err, data) => {
      if (err) throw err;

      res.end(data);
    });
  }
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});
