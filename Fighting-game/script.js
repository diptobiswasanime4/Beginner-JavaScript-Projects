const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024 / 2;
canvas.height = 576 / 2;

const gravity = 0.5;
let lastKey;

const player = new Sprite({
  position: { x: 10, y: 10 },
  velocity: { x: 0, y: 0 },
  color: "darkred",
  health: 125,
});
const enemy = new Sprite({
  position: { x: 310, y: 10 },
  velocity: { x: 0, y: 0 },
  color: "darkblue",
  health: 100,
});
const healthBar = new HealthBar(player, enemy);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  healthBar.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // Player Movement
  if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 5;
  }
  // Enemy Movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }
}

animate();
