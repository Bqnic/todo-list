import { projects } from "./project";
import { allTasks } from "./task";

export function saveTasks(){
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

export function saveProjects(){
    localStorage.setItem('projects', JSON.stringify(projects));
}