import { setHiddenAttr, checkValidName, clearInputField } from "./reuseFunc";
import todoList from "./todoList";
import Project from "./project";
import Task from "./task";
import createProjectDOM from "./projectDOM";
import contentDOM from "./contentDisplayDOM";
import { createTaskDOM, modifyTaskDOM } from "./taskDOM";

// Support function for siteBarUI
function createProject(name) {
  const newProject = new Project(name);
  todoList.addProject(newProject);

  return newProject;
}

// siteBarUI all handler
function addBtnHandler(target) {
  const takeProjectName = document.querySelector(".add-project-popup");
  setHiddenAttr(target, true);
  setHiddenAttr(takeProjectName, false);
}

function confirmBtnHandler() {
  const input = document.querySelector("input[type='text']");
  const addProjectBtn = document.querySelector(".add-new-project");
  const takeProjectName = document.querySelector(".add-project-popup");
  const projectContainer = document.querySelector(".project-container");

  if (!checkValidName(input.value)) {
    alert(
      "Invalid name, name must contains at least one non-whitespace character and must not be empty"
    );
    return;
  }

  if (todoList.checkDuplicate(input.value)) {
    alert("This project is already exist, please enter a new name");
    return;
  }

  const projectObject = createProject(input.value);
  projectContainer.append(createProjectDOM(projectObject));

  clearInputField();

  setHiddenAttr(takeProjectName, true);
  setHiddenAttr(addProjectBtn, false);
}

function cancelBtnHandler() {
  const addProjectBtn = document.querySelector(".add-new-project");
  const takeProjectName = document.querySelector(".add-project-popup");

  clearInputField();

  setHiddenAttr(takeProjectName, true);
  setHiddenAttr(addProjectBtn, false);
}

function deleteProjectHandler() {
  const divElement = document.querySelector(".project-item");
  const projectId = document.querySelector(".project-item").dataset.projectId;

  todoList.removeProject(projectId);
  divElement.remove();
}

// contentDOM all handler
function displayProjectContent(target) {
  const buttonElement = target.closest(".project-item");
  const projectObject = todoList.getProjectObject(buttonElement.dataset.projectId);

  const projectContainer = contentDOM(projectObject);
  displayAllCurrTask(projectObject.tasks, projectContainer.querySelector(".task-container"));

  const mainContent = document.querySelector(".main-content");
  mainContent.innerHTML = "";
  mainContent.appendChild(projectContainer);
}

function displayAllCurrTask(taskList, taskContainer) {
  for (let i = 0; i < taskList.length; i++) {
    const taskItem = createTaskDOM(taskList[i]);
    taskContainer.appendChild(taskItem);
  }
}

function shouldLoadContent(target) {
  const mainContent = document.querySelector(".main-content");
  const container = mainContent.querySelector(".container");

  if (!mainContent.contains(container)) {
    return true;
  }

  const projectItem = target.closest(".project-item");
  if (projectItem.dataset.projectId !== container.dataset.projectId) {
    return true;
  }
  return false;
}

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

// All modal function handler
//
// --      taskModalUI        -- //
const taskModalUI = ({ modalElement, projectObject, taskContainer, taskItem, taskObject }) => {
  const clickHandler = event => {
    const { target } = event;

    if (!target.matches("button")) {
      return;
    }

    if (target.matches(".add")) {
      const taskTitle = modalElement.querySelector("input[name='task-title']");

      if (!checkValidName(taskTitle.value)) {
        alert(
          "Invalid name, name must contains at least one non-whitespace character and must not be empty"
        );
        return;
      }

      if (projectObject.checkDuplicate(taskTitle.value)) {
        alert("This task is already exist, please enter a new name");
        return;
      }

      const taskDescription = modalElement.querySelector("textarea[name='task-description']");
      const taskDueDate = modalElement.querySelector("input[name='task-dueDate']");
      const taskPriority = modalElement.querySelector("input[name='priority']:checked");

      // prevent error when select a null element
      if (taskDueDate.value === "" || taskPriority === null) {
        return;
      }

      const taskObject = new Task(
        taskTitle.value,
        taskDescription.value,
        taskDueDate.value,
        taskPriority.value
      );
      projectObject.insertTask(taskObject);

      taskContainer.appendChild(createTaskDOM(taskObject));

      // remove eventListener each time to prevent event from being stacking
      modalElement.removeEventListener("click", clickHandler);
      return;
    }

    if (target.matches(".cancel")) {
      modalElement.close();
      modalElement.removeEventListener("click", clickHandler);
      return;
    }

    if (target.matches(".save")) {
      const input_Title = modalElement.querySelector("input[name='task-title']");
      const textarea_Description = modalElement.querySelector("textarea#description");
      const input_DueDate = modalElement.querySelector("input[name='task-dueDate']");
      const input_Priority = modalElement.querySelector("input[name='priority']:checked");

      taskObject.editInfo(
        input_Title.value,
        textarea_Description.value,
        input_DueDate.value,
        input_Priority.value
      );

      modifyTaskDOM(taskItem, taskObject);
      modalElement.close();

      modalElement.removeEventListener("click", clickHandler);
      return;
    }
  };

  modalElement.addEventListener("click", clickHandler);
};

const displayTaskInfo_Modal = (infoModal, taskObject, projectObject) => {
  const priorityIcon = infoModal.querySelector(".priority-area");
  const taskTitle = infoModal.querySelector(".task-title");
  const timeArea = infoModal.querySelector(".time-area");
  const projectArea = infoModal.querySelector(".project-area");
  const noteArea = infoModal.querySelector(".note-area");

  priorityIcon.classList.add(`${taskObject.priority}-level`);
  taskTitle.textContent = taskObject.name;
  timeArea.textContent = taskObject.dueDate;
  projectArea.textContent = projectObject.name;
  noteArea.textContent = taskObject.details;

  infoModal.showModal();
  const closeModalBtn = infoModal.querySelector(".close-modal-btn");

  function closeModalBtnHandler() {
    const removeClassName = Array.from(priorityIcon.classList).find(className => {
      return className.includes("-level");
    });
    priorityIcon.classList.remove(removeClassName);

    taskTitle.textContent = "";
    timeArea.textContent = "";
    projectArea.textContent = "";
    noteArea.textContent = "";

    infoModal.close();

    closeModalBtn.removeEventListener("click", closeModalBtnHandler);
  }

  closeModalBtn.addEventListener("click", closeModalBtnHandler);
};

export {
  addBtnHandler,
  confirmBtnHandler,
  cancelBtnHandler,
  deleteProjectHandler,
  displayProjectContent,
  shouldLoadContent,
  addNewTaskHandler,
  checkTaskStateHandler,
  editTaskHandler,
  deleteTaskHandler,
  showTaskInfoHandler,
};
