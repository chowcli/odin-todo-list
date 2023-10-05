function contentDOM(project) {
  const h2Element = document.createElement("h2");
  h2Element.textContent = project.name;

  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  const addTaskBtn = document.createElement("div");
  addTaskBtn.classList.add("add-task");
  const icon = document.createElement("i");
  icon.classList.add("bx", "bx-plus");
  const span = document.createElement("span");
  span.textContent = "Add New Task";
  addTaskBtn.append(icon, span);

  const container = document.createElement("div");
  container.classList.add("container");
  container.setAttribute("data-project-id", project.id);
  container.append(h2Element, taskContainer, addTaskBtn);

  return container;
}

export default contentDOM;
