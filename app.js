import { addTodo, toggleTodo, removeTodo } from "./js/todo-logic.js";

const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-btn");
const taskList = document.querySelector("#task-list");
const message = document.querySelector("#message");

let todos = [];

function showMessage(text) {
  message.textContent = text;
}

function renderTodos() {
  taskList.replaceChildren();

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = todo.done ? "task completed" : "task";
    item.dataset.id = String(todo.id);

    const label = document.createElement("span");
    label.textContent = todo.text;
    label.className = "task-text";

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "toggle-btn";
    toggleButton.textContent = todo.done ? "Undo" : "Complete";
    toggleButton.setAttribute(
      "aria-label",
      `${todo.done ? "Mark" : "Complete"} ${todo.text}`,
    );

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);

    item.append(label, toggleButton, deleteButton);
    taskList.append(item);
  });
}

function handleAddTodo() {
  const text = taskInput.value.trim();

  if (!text) {
    showMessage("Please enter a task before adding it.");
    taskInput.focus();
    return;
  }

  todos = addTodo(todos, text);
  taskInput.value = "";
  showMessage("Task added.");
  renderTodos();
  taskInput.focus();
}

function handleTaskListClick(event) {
  const button = event.target.closest("button");
  const taskItem = button?.closest(".task");

  if (!button || !taskItem || !taskList.contains(taskItem)) {
    return;
  }

  const id = Number(taskItem.dataset.id);

  if (button.classList.contains("toggle-btn")) {
    todos = toggleTodo(todos, id);
  }

  if (button.classList.contains("delete-btn")) {
    todos = removeTodo(todos, id);
    showMessage("Task deleted.");
  }

  renderTodos();
}

addButton.addEventListener("click", handleAddTodo);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTodo();
  }
});

taskList.addEventListener("click", handleTaskListClick);

renderTodos();
