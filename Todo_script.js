const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  addTask(taskText);
  taskInput.value = '';
  saveTasks();
});

// Add task when Enter key is pressed
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTaskBtn.click();
  }
});

// Add a new task to the list
function addTask(taskText) {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="checkbox" />
    <span class="task-text">${taskText}</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;

  // Mark task as completed
  li.querySelector('.checkbox').addEventListener('change', function () {
    if (this.checked) {
      li.classList.add('completed');
    } else {
      li.classList.remove('completed');
    }
    saveTasks();
  });

  // Edit task
  li.querySelector('.edit').addEventListener('click', function () {
    const newTaskText = prompt("Edit your task:", li.querySelector('.task-text').innerText);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      li.querySelector('.task-text').innerText = newTaskText.trim();
      saveTasks();
    }
  });

  // Delete task
  li.querySelector('.delete').addEventListener('click', function () {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.querySelector('.task-text').innerText,
      completed: li.querySelector('.checkbox').checked
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
      <span class="task-text">${task.text}</span>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;

    // Mark task as completed
    li.querySelector('.checkbox').addEventListener('change', function () {
      if (this.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
      saveTasks();
    });

    // Edit task
    li.querySelector('.edit').addEventListener('click', function () {
      const newTaskText = prompt("Edit your task:", li.querySelector('.task-text').innerText);
      if (newTaskText !== null && newTaskText.trim() !== "") {
        li.querySelector('.task-text').innerText = newTaskText.trim();
        saveTasks();
      }
    });

    // Delete task
    li.querySelector('.delete').addEventListener('click', function () {
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  });
}
