const canvas = document.querySelector("canvas");
const scoreBoard = document.getElementById("score");
ctx = canvas.getContext("2d");

// canvas.width = innerWidth;
// canvas.height = innerHeight;
canvas.width = 1024;
canvas.height = 625;

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.opacity = 1;
    this.rotation = 0;

    const image = new Image();
    image.src = "./img/spaceship.png";
    image.onload = () => {
      const scale = 0.15;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 10,
      };
    };
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    );
    ctx.rotate(this.rotation);
    ctx.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    );

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.restore();
  }
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}

class Invader {
  constructor({ position }) {
    this.velocity = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = "./img/invader.png";
    image.onload = () => {
      const scale = 1;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update({ velocity }) {
    if (this.image) {
      this.draw();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }
  shoot(invaderProjectiles) {
    invaderProjectiles.push(
      new InvaderProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
        velocity: {
          x: 0,
          y: 5,
        },
      })
    );
  }
}

class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 3;
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
    ctx.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Particle {
  constructor({ position, velocity, radius, color, fades = true }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.fades = fades;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
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
    ctx.closePath();
    ctx.restore();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.fades) this.opacity -= 0.01;
  }
}

class InvaderProjectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
    this.color = "white";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.velocity = {
      x: 5,
      y: 0,
    };
    this.invaders = [];

    const cols = Math.floor(Math.random() * 6 + 6);
    const rows = Math.floor(Math.random() * 4 + 4);

    this.width = cols * 30;

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        this.invaders.push(
          new Invader({
            position: {
              x: i * 30,
              y: j * 30,
            },
          })
        );
      }
    }
    console.log(this.invaders);
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y = 0;
    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x *= -1;
      this.velocity.y = 10;
    }
  }
}
const player = new Player();
const projectiles = [];
// const invader = new Invader();
const grids = [new Grid()];
let frames = 1;
let frameInterval = Math.floor(Math.random() * 500) + 500;
let game = {
  over: false,
  active: true,
};
const invaderProjectiles = [];
const particles = [];
let score = 0;

for (let i = 0; i < 100; i++) {
  particles.push(
    new Particle({
      position: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      },
      velocity: {
        x: 0,
        y: 0.25,
      },
      radius: Math.random() * 3,
      color: "white",
      fades: false,
    })
  );
}

function createParticles({ object, color }) {
  for (let i = 0; i < 20; i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        radius: Math.random() * 3,
        color: color || "yellow",
      })
    );
  }
}

console.log(frameInterval);

function animate() {
  if (!game.active) return;
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  particles.forEach((particle, i) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = -particle.radius;
    }
    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(i, 1);
      }, 0);
    }
    particle.update();
  });
  // console.log(particles);
  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
      canvas.height
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
      }, 0);
    } else invaderProjectile.update();
    // Enemy bullet hits player
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
        player.position.y &&
      invaderProjectile.position.x + invaderProjectile.width >=
        player.position.x &&
      invaderProjectile.position.x <= player.position.x + player.width
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
        player.opacity = 0;
        game.over = true;
      }, 0);
      setTimeout(() => {
        game.active = false;
      }, 2000);
      console.log("You Lose!");
      createParticles({
        object: player,
        color: "lightyellow",
      });
    }
  });
  // console.log(invaderProjectiles);
  //   invader.update();
  grids.forEach((grid, gridIdx) => {
    grid.update();
    // Spawn enemy projectiles
    if ((frames % 100 === 0) & (grid.invaders.length > 0)) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
        invaderProjectiles
      );
    }
    grid.invaders.forEach((invader, i) => {
      invader.update({ velocity: grid.velocity });

      // Bullet hits invader
      projectiles.forEach((projectile, j) => {
        if (
          projectile.position.y - projectile.radius <=
            invader.position.y + invader.height &&
          projectile.position.x - projectile.radius >= invader.position.x &&
          projectile.position.x + projectile.radius <=
            invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            /*
            const invaderFound = grid.invaders.find((invader_another) => {
              invader_another === invader;
            });
            const projectileFound = projectiles.find(
              (projectile_another) => projectile_another === projectile
            );
            */
            score += 1;
            scoreBoard.innerHTML = score;
            createParticles({
              object: invader,
            });
            // Remove invader and bullet
            grid.invaders.splice(i, 1);
            projectiles.splice(j, 1);
            if (grid.invaders.length > 0) {
              const firstInvader = grid.invaders[0];
              const lastInvader = grid.invaders[grid.invaders.length - 1];

              grid.width =
                lastInvader.position.x -
                firstInvader.position.x +
                lastInvader.width;
              grid.position.x = firstInvader.position.x;
            } else {
              grid.splice(gridIdx, 1);
            }
          }, 0);
        }
      });
    });
  });
  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    } else {
      projectile.update();
    }
  });
  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -10;
    player.rotation = -0.25;
  } else if (
    keys.d.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 10;
    player.rotation = 0.25;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }
  // Spawn enemy grids
  if (frames % frameInterval == 0) {
    grids.push(new Grid());
    frameInterval = Math.floor(Math.random() * 500) + 500;
    frames = 1;
    console.log(frameInterval);
  }
  frames++;
}
animate();

addEventListener("keydown", (e) => {
  if (game.over) return;
  // console.log(e);
  switch (e.key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "ArrowLeft":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "ArrowRight":
      keys.d.pressed = true;
      break;
    case " ":
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -10,
          },
        })
      );
      console.log(projectiles);
      break;
  }
});

addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "ArrowLeft":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "ArrowRight":
      keys.d.pressed = false;
      break;
    case " ":
      break;
  }
});
