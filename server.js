const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const PUBLIC_DIR = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  
  // Enforce clean URLs (redirect .html to clean path, except index.html)
  if (reqUrl.endsWith('.html') && reqUrl !== '/index.html') {
    const cleanRoute = reqUrl.slice(0, -5) + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
    res.writeHead(301, { 'Location': cleanRoute });
    res.end();
    return;
  }

  if (reqUrl === '/') reqUrl = '/index.html';
  
  let filePath = path.join(PUBLIC_DIR, reqUrl);
  
  // Clean URL rewrite: /login -> /login.html, /recommendations -> /recommendations.html
  if (!fs.existsSync(filePath) || (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory())) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 Not Found</h1><p><a href="/recommendations">Go to Recommendations</a> | <a href="/login">Go to Login</a></p>');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
