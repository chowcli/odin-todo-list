import { createTaskDOM, modifyTaskDOM } from "./taskDOM";
import todoList from "./todoList";
import Task from "./task";
import { clearInputField, checkValidName, setHiddenAttr } from "./reuseFunc";

const mainContentUI = () => {
  const mainContent = document.querySelector(".main-content");
  const modal = document.querySelector(".modal");
  const infoModal = document.querySelector(".task-info-modal");

  mainContent.addEventListener("click", event => {
    const { target } = event;

    if (
      target.matches(".add-task") ||
      target.closest(".add-task i") ||
      target.closest(".add-task span")
    ) {
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

      return;
    }

    if (target.closest(".checkBtn")) {
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

    if (target.closest(".editBtn")) {
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

      return;
    }

    if (target.closest(".deleteBtn")) {
      const taskItem = target.closest(".task-item");
      const container = mainContent.querySelector(".container");
      const taskContainer = container.querySelector(".task-container");

      const projectObject = todoList.getProjectObject(container.dataset.projectId);

      projectObject.deleteTask(taskItem.dataset.taskId);
      taskContainer.removeChild(taskItem);

      return;
    }

    if (target.closest(".infoBtn")) {
      const taskItem = target.closest(".task-item");
      const container = mainContent.querySelector(".container");

      const projectObject = todoList.getProjectObject(container.dataset.projectId);
      const taskObject = projectObject.getTaskObject(taskItem.dataset.taskId);

      displayTaskInfo_Modal(infoModal, taskObject, projectObject);
    }
  });
};

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

export default mainContentUI;
