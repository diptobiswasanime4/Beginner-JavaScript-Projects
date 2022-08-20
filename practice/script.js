var hexColor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
var hexColorLen = hexColor.length;
var rndColor = "#";
var rndNum = 0;

for (let i = 0; i < 6; i++) {
  rndNum = Math.floor(Math.random() * hexColorLen);
  rndColor = rndColor + hexColor[rndNum];
}
console.log(rndColor);
