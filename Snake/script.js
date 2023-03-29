const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
  constructor({ length }) {
    this.position = {
      x: 100,
      y: 100,
    };
    this.speed = 10;
    this.width = 36;
    this.height = 36;
    this.length = length;
    this.color = "lawngreen";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}

class Fruit {
  constructor({ position }) {
    this.position = position;
    this.speed = 10;
    this.width = 36;
    this.height = 36;
    this.color = "red";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
const player = new Player({ length: 1 });
const fruit = new Fruit({
  position: {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
  },
});

function animate() {
  requestAnimationFrame(animate);
  player.update();
  fruit.draw();
}
animate();

keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "w":
      keys.w.pressed = true;
      break;
    case "s":
      keys.w.pressed = true;
      break;
    case "a":
      keys.w.pressed = true;
      break;
    case "d":
      keys.w.pressed = true;
      break;
  }
});
