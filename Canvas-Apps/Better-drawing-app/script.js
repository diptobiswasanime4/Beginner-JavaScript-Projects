const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth - 100;
canvas.height = innerHeight - 100;

// // Draw Smily

// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;

// ctx.beginPath();
// ctx.arc(centerX, centerY, 150, 0, Math.PI * 2, false);
// // Draw Mouth
// ctx.moveTo(centerX + 100, centerY);
// ctx.arc(centerX, centerY, 100, 0, Math.PI, false);
// // Draw Right Eye
// ctx.moveTo(centerX + 50, centerY - 50);
// ctx.arc(centerX + 40, centerY - 50, 10, 0, Math.PI * 2, false);
// // Draw Left Eye
// ctx.moveTo(centerX - 30, centerY - 50);
// ctx.arc(centerX - 40, centerY - 50, 10, 0, Math.PI * 2, false);
// ctx.stroke();

// // Breakout ball
// let ball = {
//   x: 200,
//   y: 200,
//   radius: 15,
//   dx: 4,
//   dy: 3,
// };

// function draw() {
//   ctx.beginPath();
//   ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
//   ctx.fillStyle = "darkblue";
//   ctx.fill();
// }

// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   draw();
//   ball.x += ball.dx;
//   ball.y += ball.dy;
//   if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
//     ball.dy *= -1;
//   }
//   if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
//     ball.dx *= -1;
//   }

//   requestAnimationFrame(update);
// }
// update();
