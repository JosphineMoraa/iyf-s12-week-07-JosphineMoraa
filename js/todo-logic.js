export function addTodo(todos,text,id=Date.now()){const clean=String(text).trim();return clean?[...todos,{id,text:clean,completed:false}]:todos}
export function toggleTodo(todos,id){return todos.map(t=>String(t.id)===String(id)?{...t,completed:!t.completed}:t)}
export function removeTodo(todos,id){return todos.filter(t=>String(t.id)!==String(id))}
export function clearCompleted(todos){return todos.filter(t=>!t.completed)}
export function filterTodos(todos,filter="all"){if(filter==="active")return todos.filter(t=>!t.completed);if(filter==="completed")return todos.filter(t=>t.completed);return [...todos]}
export function countActive(todos){return todos.filter(t=>!t.completed).length}
