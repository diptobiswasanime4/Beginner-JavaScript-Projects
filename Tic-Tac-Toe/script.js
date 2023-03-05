const X_CLASS = "x";
const O_CLASS = "o";
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElems = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winMsgElem = document.getElementById("win-msg");
const winMsgTxtElem = document.querySelector("[data-win-msg-txt]");
const restartBtn = document.getElementById("restartBtn");
let oTurn;

startGame();
restartBtn.addEventListener("click", startGame);

function startGame() {
  oTurn = false;
  cellElems.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winMsgElem.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const curClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, curClass);
  if (checkWin(curClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
    setBoardHoverClass();
  }
}
function endGame(draw) {
  if (draw) {
    winMsgTxtElem.innerText = "It's a Draw!";
  } else {
    winMsgTxtElem.innerText = `${oTurn ? "O" : "X"} Won!`;
  }
  winMsgElem.classList.add("show");
}
function isDraw() {
  return [...cellElems].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}
function placeMark(cell, curClass) {
  cell.classList.add(curClass);
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) board.classList.add(O_CLASS);
  else board.classList.add(X_CLASS);
}

function checkWin(curClass) {
  return WIN_COMBOS.some((combo) => {
    return combo.every((index) => {
      return cellElems[index].classList.contains(curClass);
    });
  });
}
