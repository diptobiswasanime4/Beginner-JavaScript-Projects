const grid = document.querySelector(".grid");
const boardWidth = 560;
const boardHeight = 400;
const blockWidth = 100;
const blockHeight = 20;
const ballDia = 25;
let timerId;
let ballXDir = 2;
let ballYDir = 2;

const userStart = [230, 10];
let curPosition = userStart;

const ballStart = [230, 100];
let ballCurPosition = ballStart;

// Block Class
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 370),
  new Block(120, 370),
  new Block(230, 370),
  new Block(340, 370),
  new Block(450, 370),
  new Block(10, 340),
  new Block(120, 340),
  new Block(230, 340),
  new Block(340, 340),
  new Block(450, 340),
  new Block(10, 310),
  new Block(120, 310),
  new Block(230, 310),
  new Block(340, 310),
  new Block(450, 310),
  //   new Block(10, 280),
  //   new Block(120, 280),
  //   new Block(230, 280),
  //   new Block(340, 280),
  //   new Block(450, 280),
  //   new Block(10, 250),
  //   new Block(120, 250),
  //   new Block(230, 250),
  //   new Block(340, 250),
  //   new Block(450, 250),
];

// Create all blocks
function createAllBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
createAllBlocks();

// Create User
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// Draw User
function drawUser() {
  user.style.left = curPosition[0] + "px";
  user.style.bottom = curPosition[1] + "px";
}

// Move User
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyA":
      curPosition[0] -= curPosition[0] > 10 ? 15 : 0;
      drawUser();
      break;
    case "KeyD":
      curPosition[0] += curPosition[0] < boardWidth - 110 ? 15 : 0;
      drawUser();
      break;
  }
});

// Create ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// Draw ball
function drawBall() {
  ball.style.left = ballCurPosition[0] + "px";
  ball.style.bottom = ballCurPosition[1] + "px";
}
// Ball movement
function ballMovement() {
  ballCurPosition[0] += ballXDir;
  ballCurPosition[1] += ballYDir;
  drawBall();
  collisionDetection();
  checkGameOver();
}
timerId = setInterval(ballMovement, 10);

// Collision Detection
function collisionDetection() {
  // Block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurPosition[1] + ballDia > blocks[i].bottomLeft[1] &&
      ballCurPosition[1] < blocks[i].bottomLeft[1] + 20 &&
      ballCurPosition[0] + ballDia > blocks[i].bottomLeft[0] &&
      ballCurPosition[0] < blocks[i].bottomLeft[0] + 100
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      ballYDir *= -1;
    }
  }
  // User collisions
  if (
    ballCurPosition[0] > curPosition[0] &&
    ballCurPosition[0] < curPosition[0] + 100 &&
    ballCurPosition[1] < curPosition[1] + 20
  ) {
    ballYDir *= -1;
  }
  // Wall collisions
  if (ballCurPosition[0] >= boardWidth - ballDia || ballCurPosition[0] <= 0) {
    ballXDir *= -1;
  } else if (
    ballCurPosition[1] >= boardHeight - ballDia ||
    ballCurPosition[1] <= 0
  ) {
    ballYDir *= -1;
  }
}
// Check for game over
function checkGameOver() {
  if (blocks.length == 0) {
    console.log("You Win!");
    clearInterval(timerId);
  }
  if (ballCurPosition[1] <= 0) {
    console.log("You Lose!");
    clearInterval(timerId);
  }
}
