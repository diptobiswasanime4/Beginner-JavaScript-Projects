const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissor = document.getElementById("scissor");
const youScore = document.getElementById("you-score");
const computerScore = document.getElementById("computer-score");
const winOrLose = document.getElementById("win-or-lose");
const youScoreCount = document.getElementById("you-score-count");
const computerScoreCount = document.getElementById("computer-score-count");

let computerRandomNumber = 0;
var computerRandomChoice = "";
var yourChoice = "";
var youScoreCounter = 0;
var computerScoreCounter = 0;

function clickRock() {
  yourChoice = "✊";
  computerRandomNumber = Math.floor(Math.random() * 3);
  if (computerRandomNumber === 0) computerRandomChoice = "✊";
  else if (computerRandomNumber === 1) computerRandomChoice = "✋";
  else computerRandomChoice = "✌";
  youScore.innerText = yourChoice;
  computerScore.innerText = `${computerRandomChoice}`;
  if (computerRandomChoice === "✌") {
    winOrLose.innerText = "You Win.";
    youScoreCounter += 1;
    youScoreCount.innerText = youScoreCounter;
  } else if (computerRandomChoice === "✋") {
    winOrLose.innerText = "You Lose!";
    computerScoreCounter += 1;
    computerScoreCount.innerText = computerScoreCounter;
  } else winOrLose.innerText = "It's a draw.";
}
function clickPaper() {
  yourChoice = "✋";
  computerRandomNumber = Math.floor(Math.random() * 3);
  if (computerRandomNumber === 0) computerRandomChoice = "✊";
  else if (computerRandomNumber === 1) computerRandomChoice = "✋";
  else computerRandomChoice = "✌";
  youScore.innerText = yourChoice;
  computerScore.innerText = `${computerRandomChoice}`;
  if (computerRandomChoice === "✊") {
    winOrLose.innerText = "You Win.";
    youScoreCounter += 1;
    youScoreCount.innerText = youScoreCounter;
  } else if (computerRandomChoice === "✌") {
    winOrLose.innerText = "You Lose!";
    computerScoreCounter += 1;
    computerScoreCount.innerText = computerScoreCounter;
  } else winOrLose.innerText = "It's a draw.";
}
function clickScissor() {
  yourChoice = "✌";
  computerRandomNumber = Math.floor(Math.random() * 3);
  if (computerRandomNumber === 0) computerRandomChoice = "✊";
  else if (computerRandomNumber === 1) computerRandomChoice = "✋";
  else computerRandomChoice = "✌";
  youScore.innerText = yourChoice;
  computerScore.innerText = `${computerRandomChoice}`;
  if (computerRandomChoice === "✋") {
    winOrLose.innerText = "You Win.";
    youScoreCounter += 1;
    youScoreCount.innerText = youScoreCounter;
  } else if (computerRandomChoice === "✊") {
    winOrLose.innerText = "You Lose!";
    computerScoreCounter += 1;
    computerScoreCount.innerText = computerScoreCounter;
  } else winOrLose.innerText = "It's a draw.";
}
