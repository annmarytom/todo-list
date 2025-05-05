const todoForm = document.getElementById('todo-list');
const inputField = document.querySelector('.input-field');
const todosContainer = document.querySelector('.todos');
const themeButton = document.getElementById("toggle-btn");

// Load existing tasks and dark mode on page load
window.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTask(task));

    const darkmodeStatus = localStorage.getItem('darkmodeStatus');
    if (darkmodeStatus === 'active') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// Add task on form submit
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = inputField.value.trim();
    if (!taskText) return;

    createTask(taskText);
    saveTask(taskText);
    inputField.value = '';
});

// Create task in DOM
function createTask(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div>
            <input type="checkbox" name="tasks">
            <span>${taskText}</span>
        </div>
        <button class="delete-btn"><i class="ri-delete-bin-fill"></i></button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        deleteTask(taskText);
    });

    todosContainer.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Dark mode toggle
themeButton.addEventListener('click', () => {
    const darkmodeStatus = localStorage.getItem('darkmodeStatus');
    darkmodeStatus !== "active" ? enableDarkMode() : disableDarkMode();
});

function enableDarkMode() {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmodeStatus', 'active');
}

function disableDarkMode() {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmodeStatus', 'inactive');
}

function updateGreetingImage() {
    const img = document.getElementById("greetings-img");
    const hour = new Date().getHours();

    let imageName = "morning.jpg"; 

    if (hour >= 5 && hour < 12) {
        imageName = "morning.jpg";
    } else if (hour >= 12 && hour < 17) {
        imageName = "good afternoon.jpg";
    } else if (hour >= 17 && hour < 20) {
        imageName = "good evening.jpg";
    } else {
        imageName = "good night.jpg";
    }

    img.src = `/public/assets/images/${imageName}`;
}

window.addEventListener("DOMContentLoaded", () => {
    updateGreetingImage();
   
});
