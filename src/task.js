import { cleanAllTasks, showAllTasks } from "./DOMtasks";
import { closeEditPopup, closePopup } from "./bodymanipulation";
import { saveTasks } from "./storage";

let createTask = function(title, description, deadline, priority, checked, project){
    return {title, description, deadline, priority, checked, project};
}

export let allTasks = [];

const storedTasks = localStorage.getItem('allTasks');

if (storedTasks){
    allTasks = JSON.parse(storedTasks);
    showAllTasks();
}

export function addTask(){
    const title = document.getElementById('title');
    const desc = document.getElementById('desc');
    const deadline = document.getElementById('deadline');
    const currCompartment = document.getElementById('dichotomy').textContent;
    let project = "not specified";

    if (currCompartment !== "All tasks" && currCompartment !== "Due today" && currCompartment !== "Due this week" && currCompartment !== "Due this month")
        project = currCompartment;

    let selectedPrio;
    if (document.getElementById('high').checked)
        selectedPrio = 'high';
    else if (document.getElementById('medium').checked)
        selectedPrio = 'medium';
    else selectedPrio = 'low';

    let dueDate = "";
    if (deadline.value == "")
        dueDate = "No due date";
    else dueDate = deadline.value;

    let task = createTask(title.value.trimStart(), desc.value, dueDate, selectedPrio, false, project);
    allTasks.push(task);

    saveTasks();

    closePopup();

    return task;
}

export function deleteTask(task){
    let index = allTasks.indexOf(task);
    allTasks.splice(index, 1);
    saveTasks();
}

export function editTask(task){
    task.title = document.getElementById('e-title').value;
    task.description = document.getElementById('e-desc').value;
    task.deadline = document.getElementById('e-deadline').value == "" ? "No due date" : document.getElementById('e-deadline').value;

    let selectedPrio;
    if (document.getElementById('e-high').checked)
        selectedPrio = 'high';
    else if (document.getElementById('e-medium').checked)
        selectedPrio = 'medium';
    else selectedPrio = 'low';

    task.priority = selectedPrio;

    saveTasks();

    closeEditPopup();
    cleanAllTasks();
    showAllTasks();
}

export function deleteTasksAssociatedWithProject(project){
    allTasks = allTasks.filter(task => task.project !== project.name);
    saveTasks();
}