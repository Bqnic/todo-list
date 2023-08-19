import { closeDetails, closeEditPopup, disableBody, openEditPopup } from "./bodymanipulation";
import { saveTasks } from "./storage";
import { allTasks, deleteTask, editTask } from "./task";
import { getISOWeek, startOfWeek, endOfWeek } from "date-fns";

export function showTask(task){
    let taskDOM = document.createElement('div');
    taskDOM.classList.add('task');

    const checkBtn = document.createElement('button');
    checkBtn.id = 'check';
    
    if (task.checked === true){
        checkBtn.textContent = "X";
        taskDOM.classList.add('checked');
    }

    checkBtn.addEventListener('click', () => {
        checkButton(checkBtn, task, taskDOM);
    });

    const firstDiv = document.createElement('div');
    firstDiv.appendChild(checkBtn);
    firstDiv.appendChild(document.createElement('p')).textContent = task.title;

    const secondDiv = document.createElement('div');
    secondDiv.appendChild(document.createElement('p')).textContent = task.deadline;
    
    let trashCan = document.createElement('img');
    trashCan.src = "../images/trash-can-outline.svg";
    trashCan.alt = "trash";

    trashCan.addEventListener('click', () => {
        deleteTask(task);
        cleanAllTasks();
        showAllTasks();
    });

    secondDiv.appendChild(trashCan);

    const midDiv = document.createElement('div');
    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('btns');
    detailsBtn.textContent = "Details";

    detailsBtn.addEventListener('click', () => {
        viewDetails(task);
    });

    const editBtn = document.createElement('button');
    editBtn.classList.add('btns');
    editBtn.textContent = "Edit";

    editBtn.addEventListener('click', () => {
        editTaskPopup(task);
    });

    midDiv.appendChild(detailsBtn);
    midDiv.appendChild(editBtn);

    firstDiv.classList.add('edit')
    secondDiv.classList.add('edit');
    midDiv.classList.add('edit');

    taskDOM.appendChild(firstDiv);
    taskDOM.appendChild(midDiv);
    taskDOM.appendChild(secondDiv);

    colorTask(task.priority, taskDOM);

    chooseToAppend(taskDOM, task);
}

function chooseToAppend(taskDOM, task){
    const cards = document.querySelector('.cards');
    let currCompartment = document.getElementById('dichotomy').textContent;

    if (currCompartment === "All tasks"){
        cards.appendChild(taskDOM);
    }

    else if (currCompartment === "Due today" && seeIfItsToday(task)){
        cards.appendChild(taskDOM);
    }

    else if (currCompartment === "Due this week" && seeIfItsThisWeek(task)){
        cards.appendChild(taskDOM);
    }

    else if (currCompartment === "Due this month" && seeIfItsThisMonth(task)){
        cards.appendChild(taskDOM);
    }

    else if (currCompartment === task.project){
        cards.appendChild(taskDOM);
    }
}

export function cleanAllTasks(){
    const cards = document.querySelector('.cards');

    while (cards.firstChild)
        cards.removeChild(cards.firstChild);
}

export function showAllTasks(){
    for (let i = 0; i < allTasks.length; i++)
        showTask(allTasks[i]);
}

function seeIfItsToday(task){
    const today = new Date();

    const taskDate = new Date(task.deadline);

    return(
        taskDate.getFullYear() === today.getFullYear() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getDate() === today.getDate()
    );
}

export function showTodayTasks(){

    let todayTasks = allTasks.filter(task => seeIfItsToday(task));

    for (let i = 0; i < todayTasks.length; i++){
        showTask(todayTasks[i]);
    }
}

function seeIfItsThisWeek(task) {
    const today = new Date();
    const taskDate = new Date(task.deadline);

    const todayWeek = getISOWeek(today);
    const taskWeek = getISOWeek(taskDate);

    return (
        taskWeek === todayWeek &&
        taskDate >= startOfWeek(today) &&
        taskDate <= endOfWeek(today)
    );
}

export function showWeeksTasks(){

    let weeksTasks = allTasks.filter(task => seeIfItsThisWeek(task));

    for (let i = 0; i < weeksTasks.length; i++)
        showTask(weeksTasks[i]);
}

function seeIfItsThisMonth(task){
    const today = new Date();
    const taskDate = new Date(task.deadline);

    return(
        today.getFullYear() === taskDate.getFullYear() &&
        today.getMonth() === taskDate.getMonth()
    );
}

export function showMonthsTasks(){
    let monthsTasks = allTasks.filter(task => seeIfItsThisMonth(task));

    for (let i = 0; i < monthsTasks.length; i++)
        showTask(monthsTasks[i]);
}

function colorTask(prio, taskDOM){
    if (prio == 'high')
        taskDOM.style.background = "linear-gradient(to right, #fee2e2, #b91c1c)";

    else if (prio == 'medium')
        taskDOM.style.background = "linear-gradient(to right, #ffedd5, #c2410c)";

    else taskDOM.style.background = "linear-gradient(to right, #ecfccb, #15803d)";
}

function checkButton(checkBtn, task, taskDOM){
    if (checkBtn.textContent == ""){
        checkBtn.textContent = "X";
        taskDOM.classList.add('checked');
        task.checked = true;
    }

    else{
        checkBtn.textContent = "";
        taskDOM.classList.remove('checked');
        task.checked = false;
    }

    saveTasks();
}

function viewDetails(task){
    const detailsDOM = document.querySelector('.view-details');
    detailsDOM.appendChild(document.createElement('p')).textContent = task.project;
    detailsDOM.appendChild(document.createElement('p')).textContent = task.title;
    detailsDOM.appendChild(document.createElement('p')).textContent = task.description;
    detailsDOM.appendChild(document.createElement('p')).textContent = task.deadline;
    detailsDOM.appendChild(document.createElement('p')).textContent = task.priority;
    
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.textContent = "Close";

    closeButton.addEventListener('click', () => {
        closeDetails();
    }); 

    detailsDOM.appendChild(closeButton);

    detailsDOM.classList.add('active');
    disableBody();
}

let currentTask = null;

function editTaskPopup(task){
    openEditPopup();
    document.getElementById('e-title').value = task.title;
    document.getElementById('e-desc').value = task.description;
    document.getElementById('e-deadline').value = task.deadline;
    document.getElementById('e-' + task.priority).checked = true;

    currentTask = task;

    document.querySelector('#cancel-edit-task').addEventListener('click', () => {
        closeEditPopup();
    });

    document.querySelector('#editing-task').addEventListener('submit', (e) => {

        let errors = document.getElementById('e-errorMessage'); 
    
        if (document.getElementById('e-title').value.trim() === "") 
            errors.textContent = "No title entered." 
    
        else errors.textContent = ""; 
    
        for (let i = 0; i < allTasks.length; i++){
            if (allTasks[i].title === document.getElementById('e-title').value.trimStart() && allTasks[i] !== currentTask){
                errors.textContent = "This title is already used for another task."
                break;
            }
        }
        
        if (errors.textContent.length > 0){ 
            e.preventDefault(); 
        } 
    
        else{
            e.preventDefault();
            editTask(currentTask);
        }
    });
}

