import createTaskDOM from "./taskDOM";
import { clearInputField } from "./reuseFunc";

const mainContentUI = () => {
  const mainContent = document.querySelector(".main-content");
  const modal = document.querySelector(".modal");

  mainContent.addEventListener("click", event => {
    const { target } = event;

    if (target.matches(".add-task") || target.closest("i") || target.closest("span")) {
      clearInputField();
      modal.showModal();
    }

    if (target.matches(".below .add")) {
      modal.close();
    }

    if (target.matches(".below .cancel")) {
      modal.close();
    }
  });
};

export default mainContentUI;
