const STORAGE_KEY = "iyf-week7-todo-state";

function isValidTask(task) {
  return (
    task !== null &&
    typeof task === "object" &&
    (typeof task.id === "string" || (typeof task.id === "number" && Number.isFinite(task.id))) &&
    typeof task.text === "string" &&
    typeof task.completed === "boolean"
  );
}

function emptyState() {
  return { tasks: [], currentFilter: "all" };
}

export function loadState(storage) {
  try {
    // Access localStorage inside the try block because browsers can throw
    // when storage is disabled or unavailable for the current page.
    const store = storage === undefined ? globalThis.localStorage : storage;
    if (!store) return emptyState();

    const raw = store.getItem(STORAGE_KEY);
    if (!raw) return emptyState();

    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
      return emptyState();
    }

    return {
      tasks: Array.isArray(saved.tasks) ? saved.tasks.filter(isValidTask) : [],
      currentFilter: ["all", "active", "completed"].includes(saved.currentFilter)
        ? saved.currentFilter
        : "all",
    };
  } catch {
    return emptyState();
  }
}

export function saveState(state, storage) {
  try {
    const store = storage === undefined ? globalThis.localStorage : storage;
    if (!store) return false;
    store.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
