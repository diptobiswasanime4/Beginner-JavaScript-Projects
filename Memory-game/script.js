const cardsArray = [
  {
    name: "Articuno",
    img: "images/Articuno100x100.png",
  },
  {
    name: "Charizard",
    img: "images/Charizard100x100.png",
  },
  {
    name: "Gengar",
    img: "images/Gengar100x100.png",
  },
  {
    name: "Marill",
    img: "images/Marill100x100.png",
  },
  {
    name: "Phanpy",
    img: "images/Phanpy100x100.png",
  },
  {
    name: "Pikachu",
    img: "images/Pikachu100x100.png",
  },
  {
    name: "Snorlax",
    img: "images/Snorlax100x100.png",
  },
  {
    name: "Zapdos",
    img: "images/Zapdos100x100.png",
  },
  {
    name: "Articuno",
    img: "images/Articuno100x100.png",
  },
  {
    name: "Charizard",
    img: "images/Charizard100x100.png",
  },
  {
    name: "Gengar",
    img: "images/Gengar100x100.png",
  },
  {
    name: "Marill",
    img: "images/Marill100x100.png",
  },
  {
    name: "Phanpy",
    img: "images/Phanpy100x100.png",
  },
  {
    name: "Pikachu",
    img: "images/Pikachu100x100.png",
  },
  {
    name: "Snorlax",
    img: "images/Snorlax100x100.png",
  },
  {
    name: "Zapdos",
    img: "images/Zapdos100x100.png",
  },
];

// Randomize card array
cardsArray.sort(() => 0.5 - Math.random());

let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

const grid = document.querySelector("#grid");
const scoreBoard = document.getElementById("score");
const highScoreBoard = document.getElementById("high-score");
const player = document.getElementById("player");
const highPlayer = document.getElementById("high-player");

let playerName = prompt("Enter your name: ");
let score = 0;

let highPlayerName = localStorage.getItem("player");
let highScore = localStorage.getItem("highScore");
player.innerHTML = playerName;
highPlayer.innerHTML = highPlayerName;
highScoreBoard.innerHTML = highScore;

function createBoard() {
  for (i = 0; i < cardsArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/Blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  }
}
function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(cardsArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardsArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkCardsMatch, 500);
  }
}

function checkCardsMatch() {
  const allCards = document.querySelectorAll("img");
  if (cardsChosen[0] == cardsChosen[1]) {
    console.log("It's a match!");
    score += 1;
    scoreBoard.innerHTML = `${score}`;
    allCards[cardsChosenIds[0]].setAttribute("src", "images/White.png");
    allCards[cardsChosenIds[1]].setAttribute("src", "images/White.png");
    allCards[cardsChosenIds[0]].removeEventListener("click", flipCard);
    allCards[cardsChosenIds[1]].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    console.log("Not a match.");
    score -= 1;
    scoreBoard.innerHTML = `${score}`;
    allCards[cardsChosenIds[0]].setAttribute("src", "images/Blank.png");
    allCards[cardsChosenIds[1]].setAttribute("src", "images/Blank.png");
  }
  cardsChosen = [];
  cardsChosenIds = [];
  if (cardsWon.length == cardsArray.length / 2) {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      localStorage.setItem("player", playerName);
    }
    alert(`Game Over! Your score = ${score}`);
  }
}
createBoard();
