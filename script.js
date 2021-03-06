let inputTodo;
let addBtn;
let errorMessage;
let errorMessage2;
let editMenu;
let editTodo;
let taskList;
let newTask;
let headline;
let todoToEdit;


const main = () => {

    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    
    inputTodo = document.querySelector(".input-task");
    addBtn = document.querySelector(".button1");
    errorMessage = document.querySelector(".error-message");
    errorMessage2 = document.querySelector(".error-message2");
    editMenu = document.querySelector(".edit-menu");
    taskList = document.querySelector(".task-list");
    editTodo = document.querySelector(".edit-task");
    headline = document.querySelector("h2");

}

const prepareDOMEvents = () => {

    addBtn.addEventListener("click", addingNewTask);
    taskList.addEventListener("click", buttonSelect);
    editMenu.addEventListener("click", editSelect);
    inputTodo.addEventListener("keyup", enterKey);
}

function addingNewTask(){
    if(!inputTodo.value == ""){

        newTask = document.createElement("li");
        newTask.textContent = inputTodo.value;
        createTools();

        taskList.appendChild(newTask);
        inputTodo.value = "";
        errorMessage.textContent = "";
    }
    else{
        errorMessage.style.display = "block";
        errorMessage.textContent = "Wypełnij poprawnie pole!";
    }

    if(taskList.children.length != 0){
        headline.textContent = "Lista zadań:";
    }

}

function createTools(){
    let tools = document.createElement("div");

    let btn1 = document.createElement("button");
    btn1.innerHTML = '<i class="fas fa-check"></i>'
    btn1.classList.add("complete");
    let btn2 = document.createElement("button");
    btn2.innerHTML = "EDIT";
    btn2.classList.add("edit");
    let btn3 = document.createElement("button");
    btn3.innerHTML = '<i class="fas fa-times"></i>'
    btn3.classList.add("delete");

    tools.append(btn1, btn2, btn3);
    tools.classList.add("tools");
    
    newTask.appendChild(tools);
    
}

function buttonSelect(el) {
    if(el.target.matches(".complete")){
       el.target.closest("li").classList.toggle("liCompleted");
    }
    else if(el.target.matches(".edit")){
        editTask(el);
    }
    else if(el.target.matches(".delete")){
        deleteTask(el);
    }

    if(taskList.children.length == 0){
        headline.textContent = "Brak zadań na liście.";
    }
}

function editTask(el){
    editMenu.style.display = "block";
    todoToEdit = el.target.closest("li").firstChild;
    editTodo.value = todoToEdit.textContent;

}

function editSelect(el){
    if(el.target.matches(".button2")){
        if(!editTodo.value == ''){
            todoToEdit.textContent = editTodo.value;
            editMenu.style.display = "none";
            errorMessage2.textContent = "";
        }
        else{
            errorMessage2.style.display = "block";
            errorMessage2.textContent = "Wypełnij poprawnie pole!";
        }
    }
    else if(el.target.matches(".button3")){
        editMenu.style.display = "none";
        errorMessage2.textContent = "";
    }
}

function deleteTask(el){
    el.target.closest("li").remove();
    editMenu.style.display = "none";
}

function enterKey(e){
    if(e.key == "Enter"){
        addingNewTask();
    }
}

document.addEventListener("DOMContentLoaded", main);
