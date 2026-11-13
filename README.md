# Week 7 – JavaScript Best Practices
**Student:** Josphine Moraa | **Course:** IYF Weekend Academy, Season 12

## Assignment
Refactor the Week 5 To-Do List into modules. Save tasks and the selected filter after refresh with localStorage, recover safely from missing or malformed saved data, and add tests and quality tools.

## Layout
- index.html, styles.css – To-Do List interface
- js/app.js – application events and orchestration
- js/state.js – application state
- js/storage.js – safe localStorage load/save
- js/todo-logic.js – pure functions without DOM
- js/ui.js – DOM rendering
- tests/todo-logic.test.js – Vitest unit tests
- cart/ – Lesson 13 Shopping Cart
- daily-challenges/ – five async challenges

## Setup
Use Node.js 22 or 24. Run: `npm install`, `npm test`, `npm run lint`, and `npm run format`.
