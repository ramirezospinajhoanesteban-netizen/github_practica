const state = {
    tasks: [],
    filter: "all"
};

const elements = {
    input: document.getElementById("newTask"),
    createBtn: document.getElementById("createTask"),
    container: document.getElementById("tasksContainer"),
    filterButtons: document.querySelectorAll("[data-filter]"),
    themeBtn: document.getElementById("toggleTheme")
};

elements.createBtn.addEventListener("click", handleCreate);
elements.filterButtons.forEach(btn =>
    btn.addEventListener("click", () => changeFilter(btn.dataset.filter))
);
elements.themeBtn.addEventListener("click", toggleTheme);

function handleCreate() {
    const value = elements.input.value.trim();
    if (!value) return;

    state.tasks.push({
        id: crypto.randomUUID(),
        title: value,
        done: false
    });

    elements.input.value = "";
    draw();
}

function draw() {
    elements.container.innerHTML = "";

    const visibleTasks = state.tasks.filter(task => {
        if (state.filter === "active") return !task.done;
        if (state.filter === "done") return task.done;
        return true;
    })    visibleTasks.forEach(task => {
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
