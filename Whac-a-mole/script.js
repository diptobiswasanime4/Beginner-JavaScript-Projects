const allSquare = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");
const highPlayer = document.getElementById("high-player");
const player = document.getElementById("player");
const timeLeft = document.getElementById("time-left");

let result = 0;
let hitPosition;
let currentTime = 10;
let timerId = null;

const playerName = prompt("Enter your name: ");
player.innerHTML = playerName;

let highPlayerName = localStorage.getItem("player");
let highResult = localStorage.getItem("highScore");

highPlayer.innerHTML = highPlayerName;
highScore.innerHTML = highResult;

function rndSquare() {
  allSquare.forEach((square) => {
    square.classList.remove("mole");
  });
  let rndSquare = allSquare[Math.floor(Math.random() * 36)];
  rndSquare.classList.add("mole");
  hitPosition = rndSquare.id;
}

function moveMole() {
  timerId = setInterval(rndSquare, 500);
}

allSquare.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime == 0) {
    console.log(result);
    if (result > highResult) {
      localStorage.setItem("highScore", result);
      localStorage.setItem("player", playerName);
    }
    clearInterval(countDownTimerId);
    clearInterval(timerId);

    alert("GAME OVER! Your total score is: " + result);
  }
}

let countDownTimerId = setInterval(countDown, 1000);
