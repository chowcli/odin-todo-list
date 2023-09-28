function createProjectDOM(projectName) {
  const button = document.createElement("button");
  button.classList.add("project-item");

  const leftPanel = document.createElement("div");
  leftPanel.classList.add("left-panel");
  const leftIcon = document.createElement("i");
  leftIcon.classList.add("bx-fw", "bx", "bx-radio-circle-marked");
  const span = document.createElement("span");
  span.textContent = projectName;
  leftPanel.append(leftIcon, span);

  const rightPanel = document.createElement("div");
  rightPanel.classList.add("right-panel");
  const rightIcon = document.createElement("i");
  rightIcon.classList.add("bx", "bx-trash");
  rightPanel.appendChild(rightIcon);

  button.append(leftPanel, rightPanel);
  return button;
}

export default createProjectDOM;
