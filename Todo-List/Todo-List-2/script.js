var addTodo = document.getElementById("add-todo");
var inputTodo = document.getElementById("input-text");
var todoContainer = document.getElementById("todo-container");
var iCounter = 2;

addTodo.addEventListener("click", () => {
  var newTodo = document.createElement("div");
  newTodo.classList.add("new-todo-styling");
  newTodo.innerHTML = `
  <div class="todo-text">${iCounter}. ${inputTodo.value}</div>
  <input type="checkbox" class="todo-checkbox"></input>
  <button class="edit-todo">EDIT</button>
  <button class="del-todo">DEL</button>
  `;
  iCounter++;
  todoContainer.appendChild(newTodo);

  document.addEventListener("click", (e) => {
    if (e.target.className == "del-todo") e.target.parentNode.remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target.className == "edit-todo") {
      inputTodo.value = newTodo.innerText;
      e.target.parentNode.remove();
    }
  });
});
