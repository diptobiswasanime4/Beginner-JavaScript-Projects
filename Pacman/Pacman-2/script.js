const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 50;
  static height = 50;
  constructor({ position, color = "blue" }) {
    this.position = position;
    this.width = 50;
    this.height = 50;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.clearRect(
      this.position.x + 2,
      this.position.y + 2,
      this.height - 4,
      this.height - 4
    );
  }
}
class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.radius = 15;
    this.color = "yellow";
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      Math.PI * 0.15,
      Math.PI * 1.85,
      false
    );
    ctx.lineTo(this.position.x, this.position.y);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }
}

const map = [
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", " ", " ", " ", " ", " ", " ", " ", " ", " ", "_"],
  ["_", " ", "_", "_", " ", "_", " ", "_", "_", " ", "_"],
  ["_", " ", " ", "_", " ", " ", " ", "_", "", " ", "_"],
  ["_", " ", "_", "_", " ", "_", " ", "_", "_", " ", "_"],
  ["_", " ", " ", " ", " ", " ", " ", " ", " ", " ", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
];
const boundaries = [];
const player = new Player({
  position: {
    x: (Boundary.width * 3) / 2,
    y: (Boundary.height * 3) / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

map.forEach((row, i) => {
  row.forEach((cell, j) => {
    switch (cell) {
      case "_":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          })
        );
        break;
    }
  });
});

addEventListener("keydown", (e) => {
  console.log(e.key);
  switch (e.code) {
    case "KeyW":
      player.velocity.y = -5;
      player.velocity.x = 0;
      break;
    case "KeyS":
      player.velocity.y = 5;
      player.velocity.x = 0;
      break;
    case "KeyA":
      player.velocity.x = -5;
      player.velocity.y = 0;
      break;
    case "KeyD":
      player.velocity.x = 5;
      player.velocity.y = 0;
      break;
  }
  console.log(player.velocity);
});
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  boundaries.forEach((boundary) => {
    boundary.draw();
    if (collisionDetection(player, boundary)) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  player.update();
}

animate();
function collisionDetection(player, boundary) {
  return (
    player.position.y - player.radius + player.velocity.y <=
      boundary.position.y + boundary.height &&
    player.position.y + player.radius + player.velocity.y >=
      boundary.position.y &&
    player.position.x - player.radius + player.velocity.x <=
      boundary.position.x + boundary.width &&
    player.position.x + player.radius + player.velocity.x >= boundary.position.x
  );
}
