const http = require('http');

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  // Define the RGB color
  const rgbColor = 'rgb(34, 139, 34)'; // Example: Forest Green
  
  // HTML content with RGB color
  const htmlContent = `
    <html>
      <head>
        <title>Welcome to Proseth Event</title>
      </head>
      <body style="background-color: ${rgbColor}; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
        <h1 style="color: white; font-family: Arial, sans-serif;">Welcome to Proseth Event for K8S on AWS</h1>
      </body>
    </html>
  `;
  
  res.end(htmlContent);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

