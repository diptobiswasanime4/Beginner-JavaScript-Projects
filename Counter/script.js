var count = document.getElementById("count");
var iCount = 0;

function decrease() {
  iCount--;
  count.innerHTML = "<h2>" + iCount + "</h2>";
}
function increase() {
  iCount++;
  count.innerHTML = "<h2>" + iCount + "</h2>";
}
function reset() {
  iCount = 0;
  count.innerHTML = "<h2>" + iCount + "</h2>";
}
