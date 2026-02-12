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

    elements.input.value = "";
    draw();
}

function draw() {
    elements.container.innerHTML = "";

    const visibleTasks = state.tasks.filter(task => {
        if (state.filter === "active") return !task.done;
        if (state.filter === "done") return task.done;
        return true;
    });

    visibleTasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        if (task.done) div.classList.add("done");

        const span = document.createElement("span");
        span.textContent = task.title;

        span.addEventListener("click", () => toggleTask(task.id));

        const remove = document.createElement("button");
        remove.textContent = "Eliminar";
        remove.onclick = () => deleteTask(task.id);

        div.appendChild(span);
        div.appendChild(remove);
        elements.container.appendChild(div);
    });
}

function toggleTask(id) {
    state.tasks = state.tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
    );
    draw();
}

function deleteTask(id) {
    state.tasks = state.tasks.filter(task => task.id !== id);
    draw();
}

function changeFilter(type) {
    state.filter = type;
    draw();
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
