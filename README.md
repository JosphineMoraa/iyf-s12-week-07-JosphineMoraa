# Week 7 – JavaScript Best Practices

**Student:** Josphine Moraa  
**Course:** IYF Wecan Academy, Season 12

## Assignment goals
Refactor the Week 5 To-Do List into small JavaScript modules, persist tasks and the selected filter with localStorage, recover safely from missing or malformed saved data, and add automated tests and code-quality tools.

## Required layout
- `index.html`, `styles.css` – To-Do List interface
- `js/app.js` – application events and orchestration
- `js/state.js` – application state
- `js/storage.js` – safe localStorage load/save
- `js/todo-logic.js` – pure task functions, no DOM
- `js/ui.js` – DOM rendering
- `tests/todo-logic.test.js`, `tests/storage.test.js` – Vitest unit tests
- `cart/` – Lesson 13 Shopping Cart exercise
- `daily-challenges/` – five daily async challenges
- `eslint.config.js`, `.prettierrc`, `package.json`, `package-lock.json`, `.gitignore`

## To-Do List features
- Add, complete, delete, and clear completed tasks.
- Filter tasks by All, Active, and Completed.
- Save tasks and the selected filter, then restore both after refresh.
- Handle missing, malformed, or partly invalid saved data without crashing.
- Keep pure task logic separate from DOM manipulation.

## Shopping Cart
Open `cart/index.html` from the repository to view the Lesson 13 cart exercise. Add products, increase quantities, remove items, and view the running total.

## Daily challenges
Five async JavaScript practice files are in `daily-challenges/`. Run them individually with Node.js.

## Setup and checks
Use Node.js 22 or 24.

1. Check your Node version: `node --version`
2. Install the dependencies: `npm install`
3. Run the unit tests: `npm test`
4. Run ESLint: `npm run lint`
5. Check formatting: `npx prettier --check .`

The first `npm install` creates `package-lock.json` if it is not present. Commit that file so future installs use the same dependency versions.

## Live Demo

[Open the Week 7 To-Do List](https://josphinemoraa.github.io/iyf-s12-week-07-JosphineMoraa/)

**PR I opened:** 

