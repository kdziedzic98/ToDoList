const inputTodo = document.querySelector(".input-task");
const addBtn = document.querySelector(".button1");
const errorMessage = document.querySelector(".error-message");
const errorMessage2 = document.querySelector(".error-message2");
const editMenu = document.querySelector(".edit-menu");
const taskList = document.querySelector(".task-list");
const editTodo = document.querySelector(".edit-task");
const headline = document.querySelector("h2");

addBtn.addEventListener("click", addingNewTask);
taskList.addEventListener("click", buttonSelect);
editMenu.addEventListener("click", editSelect);
inputTodo.addEventListener("keyup", enterKey);

function addingNewTask() {
  if (!inputTodo.value == "") {
    newTask = document.createElement("li");
    newTask.textContent = inputTodo.value;
    createTools();

    taskList.appendChild(newTask);
    inputTodo.value = "";
    errorMessage.textContent = "";
  } else {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Wypełnij poprawnie pole!";
  }

  if (taskList.children.length != 0) {
    headline.textContent = "Lista zadań:";
  }
}

function createTools() {
  const tools = document.createElement("div");

  const btn1 = document.createElement("button");
  btn1.innerHTML = '<i class="fas fa-check"></i>';
  btn1.classList.add("complete");
  const btn2 = document.createElement("button");
  btn2.innerHTML = "EDIT";
  btn2.classList.add("edit");
  const btn3 = document.createElement("button");
  btn3.innerHTML = '<i class="fas fa-times"></i>';
  btn3.classList.add("delete");

  tools.append(btn1, btn2, btn3);
  tools.classList.add("tools");

  newTask.appendChild(tools);
}

function buttonSelect(el) {
  if (el.target.matches(".complete")) {
    el.target.closest("li").classList.toggle("liCompleted");
  } else if (el.target.matches(".edit")) {
    editTask(el);
  } else if (el.target.matches(".delete")) {
    deleteTask(el);
  }

  if (taskList.children.length == 0) {
    headline.textContent = "Brak zadań na liście.";
  }
}

function editTask(el) {
  editMenu.style.display = "block";
  todoToEdit = el.target.closest("li").firstChild;
  editTodo.value = todoToEdit.textContent;
}

function editSelect(el) {
  if (el.target.matches(".button2")) {
    if (!editTodo.value == "") {
      todoToEdit.textContent = editTodo.value;
      editMenu.style.display = "none";
      errorMessage2.textContent = "";
    } else {
      errorMessage2.style.display = "block";
      errorMessage2.textContent = "Wypełnij poprawnie pole!";
    }
  } else if (el.target.matches(".button3")) {
    editMenu.style.display = "none";
    errorMessage2.textContent = "";
  }
}

function deleteTask(el) {
  el.target.closest("li").remove();
  editMenu.style.display = "none";
}

function enterKey(e) {
  if (e.key == "Enter") {
    addingNewTask();
  }
}
