const todoList = (() => {
  // array of project object
  const projectList = [];

  const checkDuplicate = projectName => {
    return projectList.some(project => project.name === projectName);
  };

  const addProject = project => {
    projectList.push(project);
  };

  const removeProject = projectName => {
    const projectIndex = projectList.findIndex(project => project.name === projectName);

    if (projectIndex !== -1) {
      projectList.splice(projectIndex, 1);
    }
  };

  const findProjectIndex = projectName => {
    return projectList.findIndex(project => project.name === projectName);
  };

  return { checkDuplicate, addProject, removeProject, findProjectIndex };
})();

export default todoList;
