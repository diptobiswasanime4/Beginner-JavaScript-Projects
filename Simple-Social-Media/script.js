let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");
let post = document.getElementsByClassName("post");
let username = document.getElementById("username");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
  acceptData();
});

let formValidation = () => {
  if (input.value === "") {
    msg.innerHTML = `<p style="color:red;">Post cannot be blank!</p>`;
  } else {
    msg.innerHTML = `<p style="color:lawngreen;">Post added successfully!</p>`;
  }
};

let data = {};

let acceptData = () => {
  data["text"] = input.value;
  console.log(data);
  if (data.text !== "") createPost();
};

let createPost = () => {
  let userName = username.value;
  if (userName === "") userName = "Anonymous";
  posts.innerHTML += `<div class="post">
  <p>${userName}: ${data.text}</p>
  <span class="options">
    <i onClick="likePost(this)" class="fas fa-heart"></i>    
    <i onClick="editPost(this)" class="fas fa-edit"></i>
    <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
  </span>
</div>`;
  input.value = "";
  username.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
};

let editPost = (e) => {
  let totalText = e.parentElement.previousElementSibling.innerHTML;
  let editText = totalText.split(":");
  let editName = editText[0];
  editText = editText[1];
  editText = editText.trim();
  input.value = editText;
  username.value = editName;
  e.parentElement.parentElement.remove();
};

let likePost = (e) => {};
