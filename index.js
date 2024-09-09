const http = require('http');

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  // HTML content for the car racing game with background label
  const htmlContent = `
    <html>
      <head>
        <title>Proseth Racing Game</title>
        <style>
          body {
            margin: 0;
            overflow: hidden;
            background-color: #333;
            font-family: Arial, sans-serif;
          }
          canvas {
            display: block;
            margin: 0 auto;
            background-color: #444;
            position: relative;
          }
          #background-label {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.8); /* More visible white color */
            font-size: 36px;
            font-weight: bold;
            user-select: none;
            pointer-events: none;
          }
          #score {
            position: absolute;
            top: 10px;
            left: 10px;
            color: white;
            font-size: 20px;
          }
        </style>
      </head>
      <body>
        <div id="score">Score: 0</div>
        <div id="background-label">Proseth App V5</div>
        <canvas id="gameCanvas" width="320" height="480"></canvas>
        <script>
          const canvas = document.getElementById('gameCanvas');
          const ctx = canvas.getContext('2d');

          const playerCar = {
            x: canvas.width / 2 - 20,
            y: canvas.height - 70,
            width: 40,
            height: 60,
            color: 'blue',
            speed: 5,
            moveLeft: false,
            moveRight: false
          };

          const obstacles = [];
          let score = 0;
          let gameOver = false;

          function drawCar(car) {
            ctx.fillStyle = car.color;
            ctx.fillRect(car.x, car.y, car.width, car.height);
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText('Proseth', car.x + 2, car.y + 35);
          }

          function drawObstacle(obstacle) {
            const gradient = ctx.createLinearGradient(0, obstacle.y, 0, obstacle.y + obstacle.height);
            gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0.5)');
            ctx.fillStyle = gradient;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
          }

          function updateCar() {
            if (playerCar.moveLeft && playerCar.x > 0) {
              playerCar.x -= playerCar.speed;
            }
            if (playerCar.moveRight && playerCar.x < canvas.width - playerCar.width) {
              playerCar.x += playerCar.speed;
            }
          }

          function updateObstacles() {
            if (Math.random() < 0.02) {
              const width = 40 + Math.random() * (canvas.width / 3);
              const x = Math.random() * (canvas.width - width);
              obstacles.push({ x: x, y: 0, width: width, height: 20 + Math.random() * 20, speed: 2 + Math.random() * 3 });
            }

            for (let i = obstacles.length - 1; i >= 0; i--) {
              const obstacle = obstacles[i];
              obstacle.y += obstacle.speed;

              if (
                playerCar.x < obstacle.x + obstacle.width &&
                playerCar.x + playerCar.width > obstacle.x &&
                playerCar.y < obstacle.y + obstacle.height &&
                playerCar.y + playerCar.height > obstacle.y
              ) {
                gameOver = true;
              }

              if (obstacle.y > canvas.height) {
                obstacles.splice(i, 1);
                score++;
              }
            }
          }

          function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawCar(playerCar);
            obstacles.forEach(drawObstacle);

            updateCar();
            updateObstacles();

            document.getElementById('score').innerText = 'Score: ' + score;

            if (!gameOver) {
              requestAnimationFrame(draw);
            } else {
              ctx.font = '30px Arial';
              ctx.fillStyle = 'red';
              ctx.fillText('Game Over', 90, 240);
            }
          }

          document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') playerCar.moveLeft = true;
            if (e.key === 'ArrowRight') playerCar.moveRight = true;
          });

          document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') playerCar.moveLeft = false;
            if (e.key === 'ArrowRight') playerCar.moveRight = false;
          });

          draw();
        </script>
      </body>
    </html>
  `;

  res.end(htmlContent);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
