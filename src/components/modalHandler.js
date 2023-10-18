import { checkValidName } from "./commonFnc";
import Task from "./task";
import { createTaskDOM, modifyTaskDOM } from "./taskDOM";

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

// --      TaskInfo_modal UI        -- //
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

export { taskModalUI, displayTaskInfo_Modal };
