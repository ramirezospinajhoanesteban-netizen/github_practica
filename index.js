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