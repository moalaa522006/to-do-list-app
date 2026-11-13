let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Convert old saved tasks into the new format
tasks = tasks.map(function(task) {
    if (typeof task === "string") {
        return { text: task, completed: false };
    }
    return task;
});

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearAllBtn = document.getElementById("clearAllBtn");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
    taskCounter.textContent = "Tasks: " + tasks.length;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function(event) {
            event.stopPropagation();

            tasks = tasks.filter(function(item) {
                return item !== task;
            });

            saveTasks();
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    updateCounter();
}

addBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();
    taskInput.value = "";
});

clearAllBtn.addEventListener("click", function() {
    tasks = [];
    saveTasks();
    renderTasks();
});

saveTasks();
renderTasks();
