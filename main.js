// index and style were done pretty unguided
// for this file i followed a tutorial pretty closely
// basically i would get to the next step, then pause the video and try to do it myself
// after i finished i would watch the video again to see if i did it a similar way
// whatever i do for practice after this will be unguided

const taskForm = document.querySelector('form');
const taskInput = document.getElementById('task-input');
const taskListUL = document.getElementById('tasks-list');

// make the allTasks array using local storage
let allTasks = getTasks();

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
})

// task takes the text from the input and adds it to the list
function addTask() {
    // read input and trim it
    const taskText = taskInput.value.trim();

    // only do things if there is a task input
    if(taskText.length > 0) {

        // this is a javascript object
        // we use this to see if the task is completed or not and save it
        const taskObject = {
            text: taskText,
            completed: false
        }

        // add the new task to the tasks array
        allTasks.push(taskObject);

        // update the task list on screen
        updateTaskList();

        // reset the text bar
        taskInput.value = "";
    }
}

// update the allTasks list for each change
function updateTaskList() {

    // reset the UL, we remake it from scratch each time
    // id like to know why this is. or if its just a quirk that this guide has
    taskListUL.innerHTML = "";

    // for each task, create a task item
    // taskIndex is created here to index the tasks, thats how we assign the ID to each task
    allTasks.forEach((task, taskIndex)=>{

        // make a new task item with the current task an ID of task index
        taskItem = createTaskItem(task, taskIndex);

        // add that new task to the list
        taskListUL.append(taskItem);
    })
}

// create a new LI for each todo
function createTaskItem(task, taskIndex) {

    // create the taskID for the current task
    const taskID = "task-"+taskIndex;

    // make a new taskLI for the new task
    const taskLI = document.createElement("li");

    const taskText = task.text;

    // set the class name for the new LI
    taskLI.className = "task";

    // set the HTML for the new taskLI
    // we use taskID to set the ID and {task} to set the task.
    taskLI.innerHTML = `
        <input type="checkbox" id="${taskID}">
            <label for="${taskID}" class="task-text">${taskText}</label>
            <button class="trash-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </button>
    
    `
    
    // get the trash button
    const trashButton = taskLI.querySelector(".trash-button");

    // when we click the trash button, we remove the task
    trashButton.addEventListener("click", ()=>{
        removeTaskItem(taskIndex);
    })

    const checkbox = taskLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTasks[taskIndex].completed = checkbox.checked;
        saveTasks();
    })

    checkbox.checked = task.completed;
    
    // return the task
    return taskLI;
}

// remove the task at the given index
function removeTaskItem(taskIndex) {
    // filter the allTasks array. filters out items that match taskIndex, which is the current one
    allTasks = allTasks.filter((_, i)=> i !== taskIndex);
    
    // save tasks since we updated
    saveTasks();

    updateTaskList();
}

// localStorage to save lists
function saveTasks() {
    // convert the allTasks array into a JSON string
    const tasksJson = JSON.stringify(allTasks);
    localStorage.setItem("tasks", tasksJson);
}

function getTasks() {
    const tasks = localStorage.getItem("tasks") || "[]";
    return JSON.parse(tasks);
}

// on refresh the list updates
updateTaskList();
