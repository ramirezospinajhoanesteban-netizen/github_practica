const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeBtn = document.getElementById("themeBtn");

let tasks = [];

addBtn.addEventListener("click", addTask);

function addTask() {
    if (taskInput.value.trim() === "") return;

    const task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false
    };

    tasks.push(task);
    taskInput.value = "";
    renderTasks();
}

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    let filtered = tasks;

    if (filter === "pending") {
        filtered = tasks.filter(t => !t.completed);
    }

    if (filter === "completed") {
        filtered = tasks.filter(t => t.completed);
    }

    filtered.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks(filter);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks(filter);
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function filterTasks(type) {
    renderTasks(type);
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
