var hexColor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
var hexColorLen = hexColor.length;
var rndColor = "#";
var rndNum = 0;
var colorInput = "";
var containerClass = document.getElementById("container");
var generateBtn = document.getElementById("generate-enter-color");
var enterColor = document.getElementById("enter-color");

function generateRandomColor() {
  for (let i = 0; i < 6; i++) {
    rndNum = Math.floor(Math.random() * hexColorLen);
    rndColor = rndColor + hexColor[rndNum];
  }
  enterColor.value = rndColor;
  rndColor = "#";
  colorInput = enterColor.value;
  containerClass.style.backgroundColor = colorInput;
}

generateBtn.addEventListener(
  "click",
  (e) => (containerClass.style.backgroundColor = enterColor.value)
);
