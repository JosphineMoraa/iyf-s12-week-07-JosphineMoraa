export function addTodo(todos, text) {
  return [...todos, { id: Date.now(), text, done: false }];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  );
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}
