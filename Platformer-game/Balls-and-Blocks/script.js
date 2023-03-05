const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

// Player class
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.radius = 15;
    this.color = "red";
  }
  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.radius + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}

// Platform class
class Platform {
  constructor({ x, y }, _width = 300, _height = 30, _color = "green") {
    this.position = {
      x,
      y,
    };
    this.width = _width;
    this.height = _height;
    this.color = _color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

let player = new Player();
let platforms = [];

const keys = {
  up: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

let scrollOffsetX = 0;
let scrollOffsetY = 0;

function init() {
  player = new Player();
  platforms = [
    new Platform({ x: 0, y: canvas.height - 50 }, 1000, 50, "brown"),
    new Platform({ x: 1100, y: canvas.height - 50 }, 1000, 50, "brown"),
    new Platform({ x: 2400, y: canvas.height - 50 }, 500, 50, "brown"),
    new Platform({ x: 200, y: 200 }),
    new Platform({ x: 500, y: 100 }),
    new Platform({ x: 800, y: 300 }),
    new Platform({ x: 1000, y: 200 }),
  ];

  scrollOffsetX = 0;
}

init();
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  });
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 10;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffsetX === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -10;
  } else {
    player.velocity.x = 0;
    // Background scroll
    if (keys.right.pressed) {
      scrollOffsetX += 10;
      platforms.forEach((platform) => {
        platform.position.x -= 10;
      });
    } else if (keys.left.pressed && scrollOffsetX > 0) {
      scrollOffsetX -= 10;
      platforms.forEach((platform) => {
        platform.position.x += 10;
      });
    }
  }
  // Platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.x + player.radius >= platform.position.x &&
      player.position.x - player.radius <=
        platform.position.x + platform.width &&
      player.position.y - player.radius <=
        platform.position.y + platform.height &&
      player.position.y + player.radius >= platform.position.y
    ) {
      player.position.y = platform.position.y + platform.height + player.radius;
    }
    if (
      player.position.x + player.radius >= platform.position.x &&
      player.position.x - player.radius <=
        platform.position.x + platform.width &&
      player.position.y + player.radius <= platform.position.y &&
      player.position.y + player.radius + player.velocity.y >=
        platform.position.y
    ) {
      player.velocity.y = 0;
    }
  });

  // Win & Lose Conditions
  if (scrollOffsetX >= 2500) {
    ctx.font = "50px Comic Sans MS";
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 3;
    ctx.strokeText("You Win!", canvas.width / 2 - 100, canvas.height / 2);
  }
  if (player.position.y > canvas.height && scrollOffsetX < 2500) {
    console.log("You Lose!");
    ctx.font = "50px Comic Sans MS";
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 3;
    ctx.strokeText("You Lose!", canvas.width / 2 - 100, canvas.height / 2);
    init();
  }
}
animate();

window.addEventListener("keydown", ({ code, keyCode }) => {
  switch (code) {
    case "KeyW":
      player.velocity.y = -15;
      break;
    case "KeyA":
      keys.left.pressed = true;
      break;
    case "KeyD":
      keys.right.pressed = true;
      break;
  }
});
window.addEventListener("keyup", ({ code, keyCode }) => {
  switch (code) {
    case "KeyA":
      keys.left.pressed = false;
      break;
    case "KeyD":
      keys.right.pressed = false;
      break;
  }
});
