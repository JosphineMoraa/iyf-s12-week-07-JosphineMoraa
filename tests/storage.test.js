import { describe, expect, it } from "vitest";
import { loadState, saveState } from "../js/storage.js";

function createStorage(initialValue = null) {
  let value = initialValue;
  return {
    getItem() { return value; },
    setItem(_key, nextValue) { value = nextValue; },
  };
}

describe("localStorage persistence", () => {
  it("returns an empty state when nothing has been saved", () => {
    expect(loadState(createStorage())).toEqual({ tasks: [], currentFilter: "all" });
  });

  it("saves and restores tasks and the selected filter", () => {
    const storage = createStorage();
    const state = { tasks: [{ id: 1, text: "Study", completed: false }], currentFilter: "active" };
    expect(saveState(state, storage)).toBe(true);
    expect(loadState(storage)).toEqual(state);
  });

  it("recovers safely from malformed JSON", () => {
    expect(loadState(createStorage("{broken json"))).toEqual({ tasks: [], currentFilter: "all" });
  });

  it("ignores invalid tasks and invalid filters", () => {
    const saved = JSON.stringify({
      tasks: [{ id: 1, text: "Valid task", completed: false }, { id: 2, text: 42, completed: false }, null],
      currentFilter: "unknown",
    });
    expect(loadState(createStorage(saved))).toEqual({
      tasks: [{ id: 1, text: "Valid task", completed: false }],
      currentFilter: "all",
    });
  });

  it("does not throw when storage reads fail", () => {
    const storage = { getItem() { throw new Error("Storage unavailable"); } };
    expect(loadState(storage)).toEqual({ tasks: [], currentFilter: "all" });
  });

  it("reports false when storage writes fail", () => {
    const storage = { setItem() { throw new Error("Storage quota exceeded"); } };
    expect(saveState({ tasks: [], currentFilter: "all" }, storage)).toBe(false);
  });
});
