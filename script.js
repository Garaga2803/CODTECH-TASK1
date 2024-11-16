let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    const dueDateInput = document.getElementById('dueDateInput').value;
    const categoryInput = document.getElementById('categoryInput').value;
    const priorityInput = document.getElementById('priorityInput').value;
    if (!taskInput) return alert("Task cannot be empty");

    const task = {
        id: new Date().getTime(),
        name: taskInput,
        dueDate: dueDateInput,
        category: categoryInput,
        priority: priorityInput,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    }).forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.name} - Due: ${task.dueDate} - ${task.category} - Priority: ${task.priority}</span>
            <div>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        document.getElementById('taskInput').value = task.name;
        document.getElementById('dueDateInput').value = task.dueDate;
        document.getElementById('categoryInput').value = task.category;
        document.getElementById('priorityInput').value = task.priority;
        deleteTask(id);
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function filterTasks(filter) {
    renderTasks(filter);
}

renderTasks();
