let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let removeAll = document.querySelector(".remove");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

let createRandomColor = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F",];
let colors = [];

for (i = 0; i < 6; i++) {
  colors.push(
    createRandomColor[Math.trunc(Math.random() * createRandomColor.length)]
  );
}

let color = `#${colors.join("")}`;

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();
//Add Task
submit.addEventListener("click", function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Add Task To Array Of Tasks
  }
});

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  //Delete Button
  if (e.target.classList.contains("del")) {
    //Remove Task From local Storage
    deleteTaskWith(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    //Remove Element From Page
    e.target.parentElement.parentElement.remove();
    //Task Element
    /*
    if (e.target.classList.contains("task")) {
      // Toggle Completed For The Task
      toggleStatusTaskWith(e.target.getAttribute("data-id"));
      e.target.classList.toggle("done");
    }*/
  }
  if (e.target.classList.contains("update")) {
    updateTaskValue(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
  }
  if (e.target.classList.contains("isCompleted")) {
    isCompleted(e.target.parentElement.parentElement.getAttribute("data-id"));
  }
});
function addTaskToArray(taskText) {
  //Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  //push Task Data To arrayOfTasks
  arrayOfTasks.push(task);
  //Add tasks to page
  addTasksToPageFrom(addTaskToArray);
  //Add tasks to local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addTasksToPageFrom(addTaskToArray) {
  //Empty the Tasks Div
  tasksDiv.innerHTML = "";
  //looping arrayOfTasks
  arrayOfTasks.forEach((task) => {
    //Create Main div
    let div = document.createElement("div");
    let p = document.createElement("p");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      p.className = "yes-completed";
    }
    div.setAttribute("data-id", task.id);

    div.style.borderBottom = `2px solid#${colors.join("")}`;

    p.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    let update = document.createElement("span");
    let isCompleted = document.createElement("span");
    p.style.fontSize="20px"
    let tools = document.createElement("div");
    span.className = "del fa-solid fa-trash-can";
    update.className = "update fa-solid fa-pen-to-square";
    tools.className = "tools";
    isCompleted.setAttribute("type", "checkbox");
    isCompleted.className = "isCompleted fa-solid fa-check";
isCompleted.style.width="25px"
    // Append Button To tools div
    tools.appendChild(span);
    tools.appendChild(update);
    tools.appendChild(isCompleted);
    div.appendChild(tools);
    div.appendChild(p);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

//removeAll elements
removeAll.addEventListener("click", (_) => {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks");
});

//updateTaskValue
function updateTaskValue(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      input.value = arrayOfTasks[i].title;
      arrayOfTasks[i].title = addTasksToPageFrom(arrayOfTasks);
      deleteTaskWith(taskId);
    }
  }
}

function isCompleted(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTasksToPageFrom(addTaskToArray);
  addDataToLocalStorageFrom(arrayOfTasks);
}
