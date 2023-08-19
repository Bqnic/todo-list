import './style.css';
import { allTasks, addTask } from './task';
import { cleanAllTasks, showAllTasks, showMonthsTasks, showTask, showTodayTasks, showWeeksTasks } from './DOMtasks';
import { closePopup, openPopup, closeDetails, closeEditPopup, openProjectPopup, closeProjectPopup, closeEditProjectPopup, closeDeleteProjectPopup, closeSidebar } from './bodymanipulation';
import { showProject } from './DOMprojects';
import { projects, addProject } from './project';

const sidebar = document.querySelector('.sidebar');
const addBtn = document.querySelector('#add');

let today = new Date().toISOString().split('T')[0];
document.getElementsByName('deadline')[0].setAttribute('min', today);
document.getElementsByName('deadline')[1].setAttribute('min', today);

addBtn.addEventListener('mouseover', () => {
    addBtn.textContent = "+ Add task";
    addBtn.classList.add('active');
});

addBtn.addEventListener('mouseout', () => {
    addBtn.textContent = "+";
    addBtn.classList.remove('active');
});

addBtn.addEventListener('click', () => {
    openPopup();
});

document.getElementById('project-btn').addEventListener('click', () => {
    openProjectPopup();
});

document.querySelector('body').addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
        closePopup();
        closeDetails();
        closeEditPopup();
        closeProjectPopup();
        closeEditProjectPopup();
        closeDeleteProjectPopup();
    }
});

document.querySelector('#cancel-add-task').addEventListener('click', () => {
    closePopup();
});

document.querySelector('#cancel-add-project').addEventListener('click', () => {
    closeProjectPopup();
});

document.querySelector('#adding-task').addEventListener('submit', (e) => {

    let errors = document.getElementById('errorMessage'); 

    if (document.getElementById('title').value.trim() === "") 
        errors.textContent = "No title entered." 

    else errors.textContent = ""; 

    for (let i = 0; i < allTasks.length; i++){
        if (allTasks[i].title == document.getElementById('title').value.trimStart()){
            errors.textContent = "This title is already used for another task."
            break;
        }
    }
    
    if (errors.textContent.length > 0){ 
        e.preventDefault(); 
    } 

    else{
        e.preventDefault();
        let task = addTask();
        showTask(task);
    }
});

document.querySelector('#adding-project').addEventListener('submit', (e) => {
    let errors = document.getElementById('p-errorMessage');

    if (document.getElementById('project').value.trim() === "")
        errors.textContent = "No project title entered.";

    else errors.textContent = "";

    for (let i = 0; i < projects.length; i++){
        if (projects[i].name === document.getElementById('project').value.trimStart()){
            errors.textContent = "This project title is already used for another project.";
            break;
        }
    }

    if (errors.textContent.length > 0){
        e.preventDefault();
    }

    else{
        e.preventDefault();
        let project = addProject(document.getElementById('project').value.trimStart());
        showProject(project);
    }
});

document.querySelector('#all-tasks').addEventListener('click', () => {
    document.getElementById('dichotomy').textContent = "All tasks";
    document.getElementById('dichotomy').classList.remove('project-active');
    closeSidebar();
    cleanAllTasks();
    showAllTasks();
});

document.querySelector('#today').addEventListener('click', () => {
    document.getElementById('dichotomy').textContent = "Due today";
    document.getElementById('dichotomy').classList.remove('project-active');
    closeSidebar();
    cleanAllTasks();
    showTodayTasks();
});

document.querySelector('#week').addEventListener('click', () => {
    document.getElementById('dichotomy').textContent = "Due this week";
    document.getElementById('dichotomy').classList.remove('project-active');
    closeSidebar();
    cleanAllTasks();
    showWeeksTasks();
});

document.querySelector('#month').addEventListener('click', () => {
    document.getElementById('dichotomy').textContent = "Due this month";
    document.getElementById('dichotomy').classList.remove('project-active');
    closeSidebar();
    cleanAllTasks();
    showMonthsTasks();
});

//adding swipeable closeable sidebar for mobile users
let touchStart;
let touchEnd;

document.querySelector('#menu').addEventListener('click', () => {
    sidebar.classList.add('active');
});

sidebar.addEventListener('touchstart', (e) => {
    touchStart = e.targetTouches[0].clientX;
});

sidebar.addEventListener('touchmove', (e) => {
    e.preventDefault();
    touchEnd = e.targetTouches[0].clientX;
});

sidebar.addEventListener('touchend', () => {
    if (touchStart - touchEnd > 120 && touchEnd !== null){
        sidebar.classList.remove('active');
        touchEnd = null;
        touchStart = null;
    }
});


//TODO
// - Edit and Delete project (DONE)
// - Add cancel buttons (DONE)
// - Don't allow earlier dates than today (DONE)
// - Design for mobile (DONE)
// - localStorage
// - change name of project (DONE)




