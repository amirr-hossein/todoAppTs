const todoValue = document.querySelector(".todo-value") as HTMLInputElement;
const addTodo = document.querySelector(".add-todo") as HTMLButtonElement;
const clearTodos = document.querySelector(".clear-todos") as HTMLButtonElement;
const todoList = document.querySelector(".todoList") as HTMLUListElement;

interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}
const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

const handleSubmit = (event: Event) => {
  event.preventDefault();

  const newTodo: Todo = {
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

const addTodoToDom = (todo: Todo) => {
  todoList.insertAdjacentHTML(
    "beforeend",
    `
        <li>
          ${todo.title}<span class="icon"
            ><i class="fa fa-trash"></i
          ></span>
        </li>
    `
  );
};
const saveTodosInLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  return true;
};
addTodo.addEventListener("click", (event) => handleSubmit(event));
window.addEventListener("DOMContentLoaded", () =>
  todos.forEach((todo) => addTodoToDom(todo))
);
