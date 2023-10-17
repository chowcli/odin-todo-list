import "../styles/content.css";
import {
  addNewTaskHandler,
  checkTaskStateHandler,
  editTaskHandler,
  deleteTaskHandler,
  showTaskInfoHandler,
} from "./AllHandlerFnc";

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
      addNewTaskHandler(modal, mainContent);
      return;
    }

    if (target.closest(".checkBtn")) {
      checkTaskStateHandler(target, mainContent);
      return;
    }

    if (target.closest(".editBtn")) {
      editTaskHandler(modal, target, mainContent);
      return;
    }

    if (target.closest(".deleteBtn")) {
      deleteTaskHandler(target, mainContent);
      return;
    }

    if (target.closest(".infoBtn")) {
      showTaskInfoHandler(target, mainContent, infoModal);
      return;
    }
  });
};

export default mainContentUI;
