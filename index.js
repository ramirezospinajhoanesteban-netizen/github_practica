const input = document.getElementById("newTask");
const btn = document.getElementById("createBtn");
const container = document.getElementById("taskContainer");

let state = [];

btn.addEventListener("click", createTask);

function createTask() {
    if (!input.value) return;

    state.push({
        id: crypto.randomUUID(),
        title: input.value,
        completed: false
    });

    input.value = "";
    drawTasks();
}

function drawTasks() {
    container.innerHTML = "";

    state.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        div.textContent = task.title;

        if (task.completed) {
            div.classList.add("completed");
        }

        div.onclick = () => {
            task.completed = !task.completed;
            drawTasks();
        };

        container.appendChild(div);
    });
}
