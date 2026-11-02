const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const filters = document.querySelectorAll(".filter");
const clearCompleted = document.getElementById("clearCompleted");
const clearAll = document.getElementById("clearAll");

let currentFilter = "all";

function updateCount() {
    let count = 0;

    for (let i = 0; i < taskList.children.length; i++) {
        const checkbox = taskList.children[i].querySelector("input");

        if (!checkbox.checked) {
            count++;
        }
    }

    taskCount.textContent = count + " items left";
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = text;
    span.className = "task-text";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }

        updateCount();
        applyFilter();
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateCount();
    });

    taskInput.value = "";

    updateCount();
    applyFilter();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function applyFilter() {
    for (let i = 0; i < taskList.children.length; i++) {
        const li = taskList.children[i];
        const checkbox = li.querySelector("input");

        if (currentFilter === "all") {
            li.style.display = "flex";
        } else if (currentFilter === "active") {
            li.style.display = checkbox.checked ? "none" : "flex";
        } else {
            li.style.display = checkbox.checked ? "flex" : "none";
        }
    }
}

filters.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filters.forEach(function (filter) {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        applyFilter();
    });
});

clearCompleted.addEventListener("click", function () {
    for (let i = taskList.children.length - 1; i >= 0; i--) {
        const checkbox = taskList.children[i].querySelector("input");

        if (checkbox.checked) {
            taskList.children[i].remove();
        }
    }

    updateCount();
});

clearAll.addEventListener("click", function () {
    taskList.innerHTML = "";
    updateCount();
});