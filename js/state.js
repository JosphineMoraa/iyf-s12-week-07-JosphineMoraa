export function createState(tasks=[],currentFilter="all"){return {tasks:Array.isArray(tasks)?tasks:[],currentFilter:["all","active","completed"].includes(currentFilter)?currentFilter:"all"}}
