let input = document.querySelector('.input');
let submit = document.querySelector('.submit');
let tasksDiv = document.querySelector('.tasks');

let arrayOfTasks = [];

if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

submit.onclick = function (){
    if(input.value !== ''){
        addTaskToArray(input.value);
        input.value = '';
    }
}

tasksDiv.addEventListener("click", (e) => {
    if(e.target.classList.contains("del")){
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText){
    const task = {
        id: Date.now(),
        title: taskText,
    }
    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks);
    addDataToLocalStorage(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){
    tasksDiv.innerHTML = '';
    arrayOfTasks.forEach(task => {
       let div = document.createElement("div"); 
       div.className = "task";
       if(task.completed){
       div.className = "task done";
       }
       div.setAttribute("data-id", task.id);
       div.appendChild(document.createTextNode(task.title));
       let span = document.createElement('span');
       span.className = 'del';
       span.appendChild(document.createTextNode("Delete"));
       div.appendChild(span);
       tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorage(arrayOfTasks);
}