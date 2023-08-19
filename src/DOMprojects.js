import { cleanAllTasks, showAllTasks } from "./DOMtasks";
import { closeDeleteProjectPopup, closeEditProjectPopup, closeProjectPopup, closeSidebar, openDeleteProjectPopup, openEditProjectPopup } from "./bodymanipulation";
import { deleteProject, editProject } from "./project";
import { projects } from "./project";

let openMenu = null;

export function showProject(project){

    const container = document.querySelector('.projects-container');

    const projectDOM = document.createElement('div');
    projectDOM.classList.add('projectDOM');
    
    const projectIcon = document.createElement('img');
    projectIcon.src = 'images/projector-screen-variant-outline.svg';
    projectIcon.alt = 'project-icon';
    projectIcon.classList.add('projectIcons');
    projectDOM.appendChild(projectIcon);

    projectDOM.appendChild(document.createElement('p')).textContent = project.name;

    //creating dropdown option menu for editing and deleting projects
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const dots = document.createElement('img');
    dots.src = 'images/dots-vertical.svg';
    dots.alt = 'dots';
    dots.classList.add('projectIcons');

    const menu = document.createElement('div');
    menu.classList.add('dropdown-menu');
    const editProjectBtn = document.createElement('button');
    editProjectBtn.textContent = "Edit";
    editProjectBtn.classList.add('menu-btns');
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.textContent = "Delete";
    deleteProjectBtn.classList.add('menu-btns');

    editProjectBtn.addEventListener('click', () => {
        editProjectPopup(project);
    });

    deleteProjectBtn.addEventListener('click', () => {
        deleteProjectPopup(project);
    });

    menu.appendChild(editProjectBtn);
    menu.appendChild(deleteProjectBtn);

    dots.addEventListener('click', (event) => {
        event.stopPropagation(); 

        if (openMenu)
            openMenu.classList.remove('active');

        menu.classList.toggle('active');
        openMenu = menu;
    });
    
    document.body.addEventListener('click', () => {
        menu.classList.remove('active');
        openMenu = null;
    });
    

    dropdown.appendChild(dots);
    dropdown.appendChild(menu);
    projectDOM.appendChild(dropdown);

    projectDOM.addEventListener('click', () => {
        document.getElementById('dichotomy').textContent = project.name;
        document.getElementById('dichotomy').classList.add('project-active');
        closeSidebar();
        cleanAllTasks();
        showAllTasks();
    });

    container.appendChild(projectDOM);

    closeProjectPopup();
}

export function cleanAllProjects(){
    const container = document.querySelector('.projects-container');

    while (container.firstChild)
        container.removeChild(container.firstChild);
}

export function showAllProjects(){
    for (let i = 0; i < projects.length; i++)
        showProject(projects[i]);
}

let currentProject = null;

function editProjectPopup(project){
    document.querySelector('#e-project').value = project.name;
    currentProject = project;
    
    openEditProjectPopup();

    document.querySelector('#cancel-edit-project').addEventListener('click', () => {
        closeEditProjectPopup();
    });

    document.querySelector('#editing-project').addEventListener('submit', (e) => {

        let errors = document.querySelector('#e-p-errorMessage');

        if (document.getElementById('e-project').value.trim() === "") 
            errors.textContent = "No name entered." 
    
        else errors.textContent = ""; 
    
        for (let i = 0; i < projects.length; i++){
            if (projects[i].name === document.getElementById('e-project').value.trimStart() && projects[i] !== currentProject){
                errors.textContent = "This name is already used for another project."
                console.log(projects);
                break;
            }
        }

        e.preventDefault();
    
        if (errors.textContent.length === 0){
            editProject(currentProject, document.getElementById('e-project').value.trimStart());
        }
    });
}

function deleteProjectPopup(project){
    openDeleteProjectPopup();

    currentProject = project;

    document.querySelector('#confirm-delete').addEventListener('click', () => {
        deleteProject(currentProject);
        closeDeleteProjectPopup();
    });

    document.querySelector('#cancel-delete').addEventListener('click', () => {
        closeDeleteProjectPopup();
    });
}
