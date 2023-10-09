import createTaskDOM from "./taskDOM";
import todoList from "./todoList";
import Task from "./task";
import { clearInputField, checkValidName, setHiddenAttr } from "./reuseFunc";

const mainContentUI = () => {
  let isModalOpen = false;
  const mainContent = document.querySelector(".main-content");
  const modal = document.querySelector(".modal");

  mainContent.addEventListener("click", event => {
    const { target } = event;

    if (target.matches(".add-task") || target.closest(".add-task i") || target.closest(".add-task span")) {
      clearInputField();
      modal.showModal();
      isModalOpen = true;

      const container = mainContent.querySelector(".container");
      const taskContainer = container.querySelector(".task-container");
      modalUI(modal, container.dataset.projectId, taskContainer, isModalOpen);
    }
  });
};

const modalUI = (modalElement, containerId, taskContainer, isModalOpen) => {
  const clickHandler = event => {
    const { target } = event;

    if (!target.matches("button")) {
      return;
    }

    if (target.matches(".add")) {
      const taskTitle = modalElement.querySelector("input[name='task-title']");

      if (!checkValidName(taskTitle.value)) {
        alert("Invalid name, name must contains at least one non-whitespace character and must not be empty");
        return;
      }

      const projectIndex = todoList.findProjectIndex(containerId);
      const projectObject = todoList.projectList[projectIndex];

      if (projectObject.checkDuplicate(taskTitle.value)) {
        alert("This task is already exist, please enter a new name");
        return;
      }

      const taskDescription = modalElement.querySelector("input[name='task-description']");
      const taskDueDate = modalElement.querySelector("input[name='task-dueDate']");
      const taskPriority = modalElement.querySelector("input[type='radio']:checked");

      // prevent error when select a null element
      if (taskDueDate.value === "" || taskPriority === null) {
        return;
      }

      const taskObject = new Task(taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value);
      projectObject.insertTask(taskObject);
      taskContainer.appendChild(createTaskDOM(taskObject));

      isModalOpen = false;
      modalElement.removeEventListener("click", clickHandler);
    }

    if (target.matches(".cancel")) {
      modalElement.close();
      isModalOpen = false;
      modalElement.removeEventListener("click", clickHandler);
    }
  };

  modalElement.addEventListener("click", clickHandler);
};

export default mainContentUI;
