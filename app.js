const input = document.querySelector("form input");
const ul = document.querySelector("ul");
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
        addTodoElement({
            text: value,
        });
        saveTodolist();
    }
    input.value = "";
    input.focus();
});

function addTodoElement(todo) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${todo.text}</span>
        <i class="fa-solid fa-trash-can"></i>`;
    if (todo.status === "disabled") {
        li.setAttribute("class", "disabled");
    }
    li.addEventListener("click", function (e) {
        e.target.classList.toggle("disabled");
    });
    li.querySelector("i").addEventListener("click", function (e) {
        e.target.parentElement.remove();
    });
    ul.appendChild(li);
}

function saveTodolist() {
    const ulList = ul.querySelectorAll("li");
    const todoList = [];
    console.log(todoList);
    ulList.forEach(function (item) {
        const text = item.querySelector("span").innerText;
        const status = item.getAttribute("class");
        todoList.push({
            text,
            status,
        });
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function initTodoList() {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList.map(function (todo) {
        addTodoElement(todo);
    });
}
initTodoList();
