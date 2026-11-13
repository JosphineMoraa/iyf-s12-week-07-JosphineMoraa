export function addTodo(todos, text, id = Date.now()) {
  const cleanText = String(text).trim();
  if (!cleanText) return todos;
  return [...todos, { id, text: cleanText, completed: false }];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function clearCompleted(todos) {
  return todos.filter((todo) => !todo.completed);
}

export function filterTodos(todos, filter = "all") {
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return [...todos];
}

export function countActive(todos) {
  return todos.filter((todo) => !todo.completed).length;
}
