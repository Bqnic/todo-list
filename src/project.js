import { cleanAllProjects, showAllProjects } from "./DOMprojects";
import { cleanAllTasks, showAllTasks } from "./DOMtasks";
import { closeEditProjectPopup } from "./bodymanipulation";
import { saveProjects } from "./storage";
import { allTasks, deleteTasksAssociatedWithProject } from "./task";

let createProject = function(name){
    return {name};
}

export let projects = [];

const storedProjects = localStorage.getItem('projects');

if (storedProjects){
    projects = JSON.parse(storedProjects);
    showAllProjects();
}

export function addProject(name){
    let project = createProject(name);
    projects.push(project);

    saveProjects();

    return project;
}

export function editProject(project, newName){
    allTasks.filter(task => task.project === project.name)
                .forEach(task => task.project = newName);

    if (document.getElementById('dichotomy').textContent === project.name)
        document.getElementById('dichotomy').textContent = newName;

    project.name = newName;

    closeEditProjectPopup();
    cleanAllProjects();
    showAllProjects();

    saveProjects();
}

export function deleteProject(project){
    deleteTasksAssociatedWithProject(project);

    let index = projects.indexOf(project);
    if (index >= 0)
        projects.splice(index, 1);

    cleanAllProjects();
    showAllProjects();

    cleanAllTasks();

    if (document.getElementById('dichotomy').textContent === project.name){
        document.getElementById('dichotomy').textContent = "All tasks";
        document.getElementById('dichotomy').classList.remove('project-active');
    }

    showAllTasks();

    saveProjects();
}