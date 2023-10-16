function setPriorityClass(priority) {
  const priorityClasses = {
    low: "low-priority",
    medium: "medium-priority",
    high: "high-priority",
  };

  return priorityClasses[priority];
}

function leftPartDOM(task) {
  const leftPart = document.createElement("div");
  leftPart.classList.add("leftPart");

  // button to store check icon
  const checkBtn = document.createElement("button");
  checkBtn.classList.add("btn", "checkBtn");
  const checkIcon = document.createElement("i");
  checkIcon.classList.add("bx", "bx-checkbox");
  checkBtn.appendChild(checkIcon);

  // span element for task name
  const taskName = document.createElement("span");
  taskName.classList.add("task-name");
  taskName.textContent = task.name;

  leftPart.append(checkBtn, taskName);

  return leftPart;
}

function rightPartDOM(task) {
  const rightPart = document.createElement("div");
  rightPart.classList.add("rightPart");

  const dueDate = document.createElement("span");
  dueDate.classList.add("task-date");
  dueDate.textContent = task.dueDate;

  // all buttons to store icons
  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "editBtn");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "deleteBtn");
  const infoBtn = document.createElement("button");
  infoBtn.classList.add("btn", "infoBtn");

  const editIcon = document.createElement("i");
  editIcon.classList.add("bx", "bx-edit");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bx", "bxs-trash");
  const infoIcon = document.createElement("i");
  infoIcon.classList.add("bx", "bx-info-circle");

  editBtn.appendChild(editIcon);
  deleteBtn.appendChild(deleteIcon);
  infoBtn.appendChild(infoIcon);
  rightPart.append(dueDate, editBtn, deleteBtn, infoBtn);

  return rightPart;
}

function createTaskDOM(task) {
  const leftPart = leftPartDOM(task);
  const rightPart = rightPartDOM(task);

  // taskItem container
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.setAttribute("data-task-id", task.id);

  // change color of text, icon and border hover based on priority
  // state of item: checked or uncheck
  const priorityClassName = setPriorityClass(task.priority);
  taskItem.classList.add(`${priorityClassName}`, `check-${task.completed}`);

  taskItem.append(leftPart, rightPart);

  return taskItem;
}

function modifyTaskDOM(taskItem, taskObject) {
  const taskName = taskItem.querySelector(".leftPart .task-name");
  const dueDate = taskItem.querySelector(".rightPart .task-date");

  taskName.textContent = taskObject.name;
  dueDate.textContent = taskObject.dueDate;

  // convert classList to array and use find method
  const oldPriority = Array.from(taskItem.classList).find(className => {
    return className.includes("-priority");
  });

  const newPriority = setPriorityClass(taskObject.priority);
  taskItem.classList.replace(oldPriority, newPriority);
}

export { createTaskDOM, modifyTaskDOM };
