"use strict";
const todoValue = document.querySelector(".todo-value");
const addTodo = document.querySelector(".add-todo");
const clearTodos = document.querySelector(".clear-todos");
const todoList = document.querySelector(".todoList");
const todos = JSON.parse(localStorage.getItem("todos") || "[]");
const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
        id: crypto.randomUUID(),
        title: todoValue.value,
        isComplete: false,
    };
    addTodoToDom(newTodo);
    todos.push(newTodo);
    saveTodosInLocalStorage();
    todoValue.value = "";
    todoValue.focus();
};
const addTodoToDom = (todo) => {
    todoList.insertAdjacentHTML("beforeend", `
        <li>
          ${todo.title}<span class="icon"
            ><i class="fa fa-trash"></i
          ></span>
        </li>
    `);
};
const saveTodosInLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    return true;
};
addTodo.addEventListener("click", (event) => handleSubmit(event));
window.addEventListener("DOMContentLoaded", () => todos.forEach((todo) => addTodoToDom(todo)));
