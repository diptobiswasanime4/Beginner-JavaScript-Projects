let str = "";
let buttons = document.querySelectorAll(".button");

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      str = eval(str);
      document.querySelector("#write-input").value = str;
    } else if (e.target.innerHTML == "C") {
      str = "";
      document.querySelector("#write-input").value = str;
    } else {
      str = str + e.target.innerHTML;
      document.querySelector("#write-input").value = str;
    }
  });
});
