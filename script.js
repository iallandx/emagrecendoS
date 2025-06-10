const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createHeart() {
  const x = Math.random() * canvas.width;
  const y = -20;
  const size = Math.random() * 20 + 10;
  const speed = Math.random() * 2 + 1;
  const opacity = Math.random() * 0.5 + 0.5;

  hearts.push({ x, y, size, speed, opacity });
}

function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 30, size / 30);
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -5, -7, -2);
  ctx.bezierCurveTo(-10, 2, 0, 8, 0, 10);
  ctx.bezierCurveTo(0, 8, 10, 2, 7, -2);
  ctx.bezierCurveTo(5, -5, 0, -3, 0, 0);
  ctx.fillStyle = '#ff3366';
  ctx.fill();
  ctx.restore();
}

function updateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((heart, index) => {
    heart.y += heart.speed;
    drawHeart(heart.x, heart.y, heart.size, heart.opacity);

    if (heart.y > canvas.height + 10) {
      hearts.splice(index, 1);
    }
  });

  if (Math.random() < 0.1) createHeart();

  requestAnimationFrame(updateHearts);
}

updateHearts();
