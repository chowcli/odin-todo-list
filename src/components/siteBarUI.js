import "../styles/site-bar.css";
import {
  addBtnHandler,
  confirmBtnHandler,
  cancelBtnHandler,
  deleteProjectHandler,
  displayProjectContent,
  shouldLoadContent,
} from "./projectHandler";

const navBarUI = () => {
  const siteBar = document.querySelector(".site-bar");

  siteBar.addEventListener("click", event => {
    const { target } = event;

    // add button handler
    if (target.classList.contains("add-new-project") || target.matches("i.bxs-book-add")) {
      addBtnHandler(target.closest("button.add-new-project"));
      return;
    }

    // confirm valid project handler
    if (target.matches(".add-project")) {
      confirmBtnHandler();
      return;
    }

    // cancel add project button handler
    if (target.matches(".cancel")) {
      cancelBtnHandler();
      return;
    }

    // delete project button handler
    if (target.matches(".bx-trash")) {
      deleteProjectHandler(target);
      return;
    }

    // display content of clicked project
    if (target.matches(".project-item") || target.closest("span")) {
      if (shouldLoadContent(target)) {
        displayProjectContent(target);
      }

      return;
    }
  });
};

export default navBarUI;
