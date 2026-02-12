const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

let tasks = [];

button.addEventListener("click", addTask);

function addTask() {
    if (!input.value.trim()) return;

    tasks.push({
        id: Date.now(),
        text: input.value,
        done: false
    });

    input.value = "";
    render();
}

function render(filter = "all") {
    list.innerHTML = "";

    let filtered = tasks;

    if (filter === "pending") {
        filtered = tasks.filter(t => !t.done);
    }

    if (filter === "done") {
        filtered = tasks.filter(t => t.done);
    }

    filtered.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.done) li.classList.add("done");

        li.onclick = () => {
            task.done = !task.done;
            render(filter);
        };

        list.appendChild(li);
    });
}

function filterTasks(type) {
    render(type);
}