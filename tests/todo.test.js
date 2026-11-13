import { describe, expect, it, vi } from "vitest";
import { addTodo, toggleTodo, removeTodo } from "../js/todo-logic.js";

describe("addTodo", () => {
  it("adds a new incomplete task without changing the original array", () => {
    vi.spyOn(Date, "now").mockReturnValue(100);

    const existingTodos = [{ id: 1, text: "Read", done: false }];
    const result = addTodo(existingTodos, "Practise JavaScript");

    expect(result).toEqual([
      { id: 1, text: "Read", done: false },
      { id: 100, text: "Practise JavaScript", done: false },
    ]);
    expect(existingTodos).toHaveLength(1);

    vi.restoreAllMocks();
  });
});

describe("toggleTodo", () => {
  it("toggles the selected task to complete", () => {
    const todos = [{ id: 1, text: "Study", done: false }];

    expect(toggleTodo(todos, 1)).toEqual([
      { id: 1, text: "Study", done: true },
    ]);
  });

  it("leaves other tasks unchanged", () => {
    const todos = [
      { id: 1, text: "Study", done: false },
      { id: 2, text: "Practise", done: false },
    ];

    expect(toggleTodo(todos, 1)[1]).toEqual(todos[1]);
  });
});

describe("removeTodo", () => {
  it("removes only the task with the matching id", () => {
    const todos = [
      { id: 1, text: "Study", done: false },
      { id: 2, text: "Practise", done: false },
    ];

    expect(removeTodo(todos, 1)).toEqual([
      { id: 2, text: "Practise", done: false },
    ]);
  });

  it("returns the original tasks when the id does not exist", () => {
    const todos = [{ id: 1, text: "Study", done: false }];

    expect(removeTodo(todos, 99)).toEqual(todos);
  });
});
