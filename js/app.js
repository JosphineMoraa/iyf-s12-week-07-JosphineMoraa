import {addTodo,toggleTodo,removeTodo,clearCompleted} from "./todo-logic.js";
import {loadState,saveState} from "./storage.js";
import {createState} from "./state.js";
import {renderTasks,renderSummary,renderFilters} from "./ui.js";
const form=document.querySelector("#task-form"),input=document.querySelector("#task-input"),error=document.querySelector("#error"),list=document.querySelector("#task-list"),filters=document.querySelector("#filters"),count=document.querySelector("#count"),clear=document.querySelector("#clear-completed");
const saved=loadState(),state=createState(saved.tasks,saved.currentFilter);
function render(){saveState(state);renderTasks(list,state.tasks,state.currentFilter);renderSummary(count,state.tasks);renderFilters(filters,state.currentFilter)}
form.addEventListener("submit",e=>{e.preventDefault();const text=input.value.trim();if(!text){error.textContent="Please enter a task.";error.classList.remove("hidden");input.focus();return}error.textContent="";error.classList.add("hidden");state.tasks=addTodo(state.tasks,text);input.value="";render();input.focus()});
list.addEventListener("click",e=>{const button=e.target.closest("button[data-action]"),li=button?.closest("li[data-id]");if(!button||!li||!list.contains(li))return;const id=li.dataset.id;if(button.dataset.action==="toggle")state.tasks=toggleTodo(state.tasks,id);if(button.dataset.action==="delete")state.tasks=removeTodo(state.tasks,id);render()});
filters.addEventListener("click",e=>{const button=e.target.closest("[data-filter]");if(!button||!filters.contains(button))return;state.currentFilter=button.dataset.filter;render()});
clear.addEventListener("click",()=>{state.tasks=clearCompleted(state.tasks);render()});
render();
