import { setHiddenAttr, clearInputField } from "./commonFnc";
import todoList from "./todoList";
import { taskModalUI, displayTaskInfo_Modal } from "./modalHandler";

// mainContentUI all handler
function addNewTaskHandler(modal, mainContent) {
  clearInputField();

  // prevent saveBtn from working when no taskItem exist
  const saveBtn = modal.querySelector(".below .save");
  const addBtn = modal.querySelector(".below .add");
  if (!saveBtn.hasAttribute("hidden")) {
    setHiddenAttr(saveBtn, true);
    setHiddenAttr(addBtn, false);
  }

  modal.showModal();

  const container = mainContent.querySelector(".container");
  const taskContainer = container.querySelector(".task-container");

  const projectObject = todoList.getProjectObject(container.dataset.projectId);

  taskModalUI({
    modalElement: modal,
    projectObject: projectObject,
    taskContainer: taskContainer,
  });
}

function checkTaskStateHandler(target, mainContent) {
  const taskItem = target.closest(".task-item");
  const container = mainContent.querySelector(".container");
  const checkBtn = target.closest(".checkBtn");

  const projectObject = todoList.getProjectObject(container.dataset.projectId);
  const taskObject = projectObject.getTaskObject(taskItem.dataset.taskId);

  if (taskItem.classList.contains("check-false")) {
    taskObject.completed = true;
    taskItem.classList.remove("check-false");
    taskItem.classList.add("check-true");

    checkBtn.querySelector("i").classList.remove("bx-checkbox");
    checkBtn.querySelector("i").classList.add("bxs-checkbox-checked");
  } else {
    taskObject.completed = false;
    taskItem.classList.remove("check-true");
    taskItem.classList.add("check-false");

    checkBtn.querySelector("i").classList.remove("bxs-checkbox-checked");
    checkBtn.querySelector("i").classList.add("bx-checkbox");
  }
}

function editTaskHandler(modal, target, mainContent) {
  const input_Title = modal.querySelector("input[name='task-title']");
  const textarea_Description = modal.querySelector("textarea#description");
  const input_DueDate = modal.querySelector("input[name='task-dueDate']");
  const input_Priorities = modal.querySelectorAll("input[name='priority']");

  const taskItem = target.closest(".task-item");
  const container = mainContent.querySelector(".container");

  const projectObject = todoList.getProjectObject(container.dataset.projectId);
  const taskObject = projectObject.getTaskObject(taskItem.dataset.taskId);

  input_Title.value = `${taskObject.name}`;
  textarea_Description.value = `${taskObject.details}`;
  input_DueDate.value = `${taskObject.dueDate}`;

  input_Priorities.forEach(input => {
    if (input.value === taskObject.priority) {
      input.checked = true;
    }
  });

  const addBtn = modal.querySelector(".below .add");
  const saveBtn = modal.querySelector(".below .save");
  setHiddenAttr(addBtn, true);
  setHiddenAttr(saveBtn, false);

  modal.showModal();
  taskModalUI({
    modalElement: modal,
    taskItem: taskItem,
    taskObject: taskObject,
  }); // use object destructuring
}

function deleteTaskHandler(target, mainContent) {
  const taskItem = target.closest(".task-item");
  const container = mainContent.querySelector(".container");
  const taskContainer = container.querySelector(".task-container");

  const projectObject = todoList.getProjectObject(container.dataset.projectId);

  projectObject.deleteTask(taskItem.dataset.taskId);
  taskContainer.removeChild(taskItem);
}

function showTaskInfoHandler(target, mainContent, infoModal) {
  const taskItem = target.closest(".task-item");
  const container = mainContent.querySelector(".container");

  const projectObject = todoList.getProjectObject(container.dataset.projectId);
  const taskObject = projectObject.getTaskObject(taskItem.dataset.taskId);

  displayTaskInfo_Modal(infoModal, taskObject, projectObject);
}

export {
  addNewTaskHandler,
  checkTaskStateHandler,
  editTaskHandler,
  deleteTaskHandler,
  showTaskInfoHandler,
};
