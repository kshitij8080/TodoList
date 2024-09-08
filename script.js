document.addEventListener("DOMContentLoaded", () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    const todoList = document.getElementById("todoList");
    const submit = document.getElementById("submit");
    const deleteAllBtn = document.getElementById("deleteAllBtn");
    const title = document.getElementById("title");
    const desc = document.getElementById("desc");

    const renderTodos = () => {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const todoItem = document.createElement("div");
            todoItem.className = "todo-item";
            todoItem.innerHTML = `
                <span class="todo-title">${todo.title}</span>
                <span class="delete-item" data-index="${index}">Delete</span>
                <p>${todo.desc}</p>
            `;
            todoList.appendChild(todoItem);
        });
    };

    const saveTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        let titlec = title.value.trim();
        let descc = desc.value.trim();

        if (titlec && descc) {
            todos.push({ title: titlec, desc: descc });
            saveTodos();
            renderTodos();
            title.value = "";
            desc.value = "";
        } else {
            alert("Please enter both title and description.");
        }
    });

    deleteAllBtn.addEventListener("click", (e) => {
        e.preventDefault();
        todos = [];
        saveTodos();
        renderTodos();
    });

    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-item")) {
            const index = e.target.getAttribute("data-index");
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }
    });

    renderTodos();
});
