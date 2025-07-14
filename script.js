let addbtn = document.getElementById("addTaskBtn");
let val = document.getElementById("taskInput");
let taskplace = document.getElementById("taskList");
let delbtn = document.getElementById("deleteBtn");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", function () {
  addbtn.addEventListener("click", function () {
    addTask();
  });

  delbtn.addEventListener("click", function () {
    delalltask();
  });

  // Load saved tasks on reload
  tasks.forEach(task => {
    createTask(task);
  });
});

function addTask() {
  let task = val.value.trim();
  if (task === "") {
    alert("add something");
    return;
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(task);
  val.value = "";
}

function createTask(task) {
  let li = document.createElement("li");
  li.style.display = "flex";
  li.style.alignItems = "center";
  li.style.justifyContent = "space-between";
  li.style.gap = "10px";
  li.style.marginBottom = "10px";
  li.style.border = "1px solid #ccc";
  li.style.borderRadius = "8px";
  li.style.backgroundColor = "#f9f9f901";
  li.style.padding = "10px";

  let content = document.createElement("div");
  content.style.display = "flex";
  content.style.alignItems = "center";
  content.style.gap = "10px";

  let input = document.createElement("input");
  input.type = "checkbox";
  input.style.height = "20px";
  input.style.width = "20px";
  input.style.cursor = "pointer";

  let p = document.createElement("p");
  p.textContent = task;
  p.style.margin = "0";
  p.style.fontSize = "16px";

  input.addEventListener("change", function () {
    if (input.checked) {
      p.style.textDecoration = "line-through";
      p.style.opacity = "1";
    } else {
      p.style.textDecoration = "none";
      p.style.opacity = "1";
    }
  });

  content.appendChild(input);
  content.appendChild(p);

  let del = document.createElement("button");
  del.textContent = "❌";
  del.style.background = "transparent";
  del.style.border = "none";
  del.style.cursor = "pointer";
  del.style.color = "red";
  del.style.fontSize = "18px";

  del.addEventListener("click",function(){
    taskplace.removeChild(li);
    tasks=tasks.filter(t=>t!==task)
    localStorage.setItem("tasks",JSON.stringify(tasks))
  })
  
  li.appendChild(content);
  li.appendChild(del);
  taskplace.appendChild(li);
}

function delalltask() {
  taskplace.innerHTML = "";
  localStorage.removeItem("tasks");
  tasks=[];
}
