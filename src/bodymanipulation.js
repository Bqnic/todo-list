export function disableBody(){
    document.querySelector('body').classList.add('unclickable');
}

export function closeSidebar(){
    document.querySelector('.sidebar').classList.remove('active');
}

export function closePopup(){
    document.querySelector('.popup-task').classList.remove('active'); 
    enableBody();
    cleanForm();
}

export function openPopup(){
    document.querySelector('.popup-task').classList.add('active');
    document.getElementById('high').checked = true;
    disableBody();
}

export function openEditPopup(){
    document.querySelector('#edit-task').classList.add('active');
    disableBody();
}

export function closeEditPopup(){
    document.querySelector('#edit-task').classList.remove('active');
    document.getElementById('e-errorMessage').textContent = "";
    enableBody();
}

export function openProjectPopup(){
    document.querySelector('#add-project').classList.add('active');
    disableBody();
}

export function closeProjectPopup(){
    document.querySelector('#add-project').classList.remove('active');
    cleanProjectForm();
    enableBody();
}

export function openEditProjectPopup(){
    document.querySelector('#edit-project').classList.add('active');
    disableBody();
}

export function closeEditProjectPopup(){
    document.querySelector('#edit-project').classList.remove('active');
    document.getElementById('e-p-errorMessage').textContent = "";
    enableBody();
}

export function openDeleteProjectPopup(){
    document.getElementById('delete-project').classList.add('active');
    disableBody();
}

export function closeDeleteProjectPopup(){
    document.getElementById('delete-project').classList.remove('active');
    enableBody();
}

export function closeDetails(){
    const detailsDOM = document.querySelector('.view-details');
    detailsDOM.classList.remove('active');
    while (detailsDOM.firstChild)
        detailsDOM.removeChild(detailsDOM.firstChild);

    enableBody();
}

function enableBody(){
    document.querySelector('body').classList.remove('unclickable');
}

function cleanForm(){
    document.getElementById('title').value = "";
    document.getElementById('desc').value = "";
    document.getElementById('deadline').value = "";
    document.getElementById('errorMessage').textContent = "";
}

function cleanProjectForm(){
    document.getElementById('project').value = "";
}
