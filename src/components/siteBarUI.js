import { setHiddenAttr, checkValidName } from "./reuseFunc";
import Project from "./project";
import createProjectDOM from "./projectDOM";
import todoList from "./todoList";

const navBarUI = () => {
  const siteBar = document.querySelector(".site-bar");

  siteBar.addEventListener("click", event => {
    const { target } = event;

    // add button handler
    if (target.matches(".add-new-project")) {
      const takeProjectName = document.querySelector(".add-project-popup");
      setHiddenAttr(target, true);
      setHiddenAttr(takeProjectName, false);
      return;
    }

    // confirm valid project handler
    if (target.matches(".add-project")) {
      const input = document.querySelector("input[type='text']");
      const addProjectBtn = document.querySelector(".add-new-project");
      const takeProjectName = document.querySelector(".add-project-popup");
      const projectContainer = document.querySelector(".project-container");

      if (!checkValidName(input.value)) {
        alert("Invalid name, name must contains at least one non-whitespace character and must not be empty");
        return;
      }

      if (todoList.checkDuplicate(input.value)) {
        alert("This project is already exist, please enter a new name");
        return;
      }

      createProject(input.value);
      projectContainer.append(createProjectDOM(input.value));

      input.value = "";

      setHiddenAttr(takeProjectName, true);
      setHiddenAttr(addProjectBtn, false);

      return;
    }

    // cancel add project button handler
    if (target.matches(".cancel")) {
      const addProjectBtn = document.querySelector(".add-new-project");
      const takeProjectName = document.querySelector(".add-project-popup");

      document.querySelector("input[type='text']").value = "";
      setHiddenAttr(takeProjectName, true);
      setHiddenAttr(addProjectBtn, false);
    }

    if (target.matches(".bx-trash")) {
      const divElement = target.closest(".project-item");
      const spanElement = divElement.querySelector("span");

      todoList.removeProject(spanElement.textContent);
      divElement.remove();
    }
  });
};

function createProject(name) {
  const newProject = new Project(name);
  todoList.addProject(newProject);
}

export default navBarUI;
