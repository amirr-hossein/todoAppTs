"use strict";
const todoValue = document.querySelector(".todo-value");
const addTodo = document.querySelector(".add-todo");
const clearTodos = document.querySelector(".clear-todos");
const todoList = document.querySelector(".todoList");
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
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
        <li onclick="removeTodo('${todo.id}')">
          ${todo.title}<span class="icon"
            ><i class="fas fa-trash"></i
          ></span>
        </li>
    `);
};
const saveTodosInLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    return true;
};
const removeTodo = (todoID) => {
    todos = todos.filter((todo) => todo.id !== todoID);
    saveTodosInLocalStorage();
    todoList.innerHTML = "";
    todos.forEach((todo) => addTodoToDom(todo));
};
addTodo.addEventListener("click", (event) => handleSubmit(event));
window.addEventListener("DOMContentLoaded", () => todos.forEach((todo) => addTodoToDom(todo)));
clearTodos.addEventListener("click", () => {
    todoList.innerHTML = "";
    todos = [];
    saveTodosInLocalStorage();
});
