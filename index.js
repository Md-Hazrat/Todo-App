//find the element
const container = document.querySelector(".container");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");


//showMessage

const showMessage = (text, status) => {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);
  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`);
  }, 2000);
};

//createTodo
const createTodo = (todoId, todoValue) => {
  const todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("li-style");
  todoElement.innerHTML = `<span>${todoValue}</span>
    <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i> </button> </span>`;
  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};

//deleteTodo
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;
  console.log(selectedTodo);
  todoLists.removeChild(selectedTodo);
  showMessage("todo is deleted", "danger");
};

//get TodoFromLocalStorage
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

//add todo
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;
  //unique id
  const todoId = Date.now().toString();
  createTodo(todoId, todoValue);
  showMessage("todo is added", "success");
  //add todo to localStorage
  const todos = getTodosFromLocalStorage();
  todos.push({ todos, todoValue });
  localStorage.setItem("mytodos", JSON.stringify(todos));
  todoInput.value = "";
};

//loadTodos
const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
};

//adding listners

todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
