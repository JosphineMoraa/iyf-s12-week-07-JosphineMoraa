const KEY="iyf-week7-todo-state";
const valid=t=>t&&(typeof t.id==="string"||typeof t.id==="number")&&typeof t.text==="string"&&typeof t.completed==="boolean";
export function loadState(storage=globalThis.localStorage){try{if(!storage)return {tasks:[],currentFilter:"all"};const saved=JSON.parse(storage.getItem(KEY)||"null");if(!saved||typeof saved!=="object")return {tasks:[],currentFilter:"all"};return {tasks:Array.isArray(saved.tasks)?saved.tasks.filter(valid):[],currentFilter:["all","active","completed"].includes(saved.currentFilter)?saved.currentFilter:"all"}}catch{return {tasks:[],currentFilter:"all"}}}
export function saveState(state,storage=globalThis.localStorage){try{if(!storage)return false;storage.setItem(KEY,JSON.stringify(state));return true}catch{return false}}
