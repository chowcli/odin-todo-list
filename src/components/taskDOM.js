function createTaskDOM(task) {
  const leftPart = document.createElement("div");
  leftPart.classList.add("leftPart");
  const checkIcon = document.createElement("i");
  checkIcon.classList.add("bx-fw", "bx", "bx-checkbox");
  const taskName = document.createElement("span");
  taskName.classList.add("task-name");
  taskName.textContent = task.name;
  leftPart.append(checkIcon, taskName);

  const rightPart = document.createElement("div");
  rightPart.classList.add("rightPart");
  const dueDate = document.createElement("span");
  dueDate.classList.add("task-date");
  dueDate.textContent = task.dueDate;
  const editIcon = document.createElement("i");
  editIcon.classList.add("bx", "bx-edit");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bx", "bxs-trash");
  const infoIcon = document.createElement("i");
  infoIcon.classList.add("bx", "bx-info-circle");
  rightPart.append(dueDate, editIcon, deleteIcon, infoIcon);

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.setAttribute("data-task-id", task.id);
  taskItem.append(leftPart, rightPart);

  return taskItem;
}

export default createTaskDOM;
