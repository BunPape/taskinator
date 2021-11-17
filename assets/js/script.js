var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress")
var tasksCompletedEl = document.querySelector("#tasks-completed")
var taskIdCounter = 0;


var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  if (!taskNameInput || taskTypeInput) {
    alert("You need to fill out the task form");
    return false;
  };
  formEl.reset();

  createTaskEl(taskDataObj);
};


var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

  taskIdCounter++;
};


var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn"
  editButtonEl.setAttribute("data-task-id", taskId)

  actionContainerEl.appendChild(editButtonEl)

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn"
  deleteButtonEl.setAttribute("data-task-id", taskId)

  actionContainerEl.appendChild(deleteButtonEl)

  // create drop down
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl)

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    statusSelectEl.appendChild(statusOptionEl)
  };

  return actionContainerEl;
};

// var taskStatusChangeHandler = function(event) {
//   console.log(event.target)
//   console.log(event.target.getAttribute("data-task-id"))

// };

formEl.addEventListener("submit", taskFormHandler);
// pageContentEl.addEventListener("change", taskStatusChangeHandler)
