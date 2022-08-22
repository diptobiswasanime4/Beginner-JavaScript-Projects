var inputTodo = document.getElementById("input-text");
var addTodo = document.getElementById("add-todo");
var todoContainer = document.getElementById("todo-contaier");

addTodo.addEventListener("click", (e) => {
  var newTodo = document.createElement("div");
  var newTodoText = document.createTextNode("todo");
  newTodo.innerText = inputTodo.value;
  //   console.log(newTodo.innerText);
  todoContainer.appendChild(newTodoText);
});
