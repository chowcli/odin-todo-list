import { setHiddenAttr, checkValidName, clearInputField } from "./commonFnc";
import todoList from "./todoList";
import Project from "./project";
import createProjectDOM from "./projectDOM";
import contentDOM from "./contentDisplayDOM";
import { createTaskDOM } from "./taskDOM";

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

function deleteProjectHandler(target) {
  const projectItem = target.closest(".project-item");
  const projectId = projectItem.dataset.projectId;

  const mainContent = document.querySelector(".main-content");
  const container = mainContent.querySelector(".container");
  if (mainContent.contains(container) && container.dataset.projectId === projectId) {
    container.remove();
  }

  todoList.removeProject(projectId);
  projectItem.remove();
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

export {
  addBtnHandler,
  confirmBtnHandler,
  cancelBtnHandler,
  deleteProjectHandler,
  displayProjectContent,
  shouldLoadContent,
};
