// ================= ELEMENTS =================

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const clearAllBtn = document.getElementById("clearAllBtn");


// ================= LOAD TASKS =================

// Get saved tasks from LocalStorage

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];


// ================= SAVE TASKS =================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// ================= DISPLAY TASKS =================

function displayTasks() {

    // Clear existing list

    taskList.innerHTML = "";


    // Empty list message

    if (tasks.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty-message";

        emptyMessage.textContent =
            "No tasks yet. Add a task to get started!";

        taskList.appendChild(emptyMessage);

        taskCount.textContent = "0";

        return;
    }


    // Create each task

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task-item";


        // Add completed class

        if (task.completed) {

            li.classList.add("completed");
        }


        // Task text

        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        // Action buttons container

        const actions = document.createElement("div");

        actions.className = "task-actions";


        // Complete button

        const completeButton =
            document.createElement("button");

        completeButton.className =
            "complete-btn";

        completeButton.textContent =
            task.completed
                ? "Undo"
                : "Complete";


        // Delete button

        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-btn";

        deleteButton.textContent =
            "Delete";


        // Complete event

        completeButton.addEventListener(
            "click",
            function() {

                toggleTask(task.id);
            }
        );


        // Delete event

        deleteButton.addEventListener(
            "click",
            function() {

                deleteTask(task.id);
            }
        );


        // Add buttons

        actions.appendChild(completeButton);

        actions.appendChild(deleteButton);


        // Add elements to li

        li.appendChild(span);

        li.appendChild(actions);


        // Add li to list

        taskList.appendChild(li);

    });


    // Update count

    taskCount.textContent = tasks.length;
}


// ================= ADD TASK =================

function addTask() {

    const taskText =
        taskInput.value.trim();


    // Validation

    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    // Create task object

    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false
    };


    // Add task

    tasks.push(newTask);


    // Save to LocalStorage

    saveTasks();


    // Display updated tasks

    displayTasks();


    // Clear input

    taskInput.value = "";


    // Focus input

    taskInput.focus();
}


// ================= COMPLETE TASK =================

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });


    saveTasks();

    displayTasks();
}


// ================= DELETE TASK =================

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;
    });


    saveTasks();

    displayTasks();
}


// ================= CLEAR ALL =================

clearAllBtn.addEventListener(
    "click",
    function() {

        if (tasks.length === 0) {

            return;
        }


        const confirmation =
            confirm(
                "Are you sure you want to delete all tasks?"
            );


        if (confirmation) {

            tasks = [];

            saveTasks();

            displayTasks();
        }
    }
);


// ================= BUTTON EVENT =================

addTaskBtn.addEventListener(
    "click",
    addTask
);


// ================= ENTER KEY =================

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();
        }
    }
);


// ================= INITIAL DISPLAY =================

displayTasks();