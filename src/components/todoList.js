const todoList = (() => {
  // array of project object
  const projectList = [];

  const avoidDuplicateProject = projectName => {
    return projectList.some(project => project.name === projectName);
  };

  const addProject = project => {
    if (!avoidDuplicateProject(project.name)) {
      projectList.push(project);
    }
  };

  const removeProject = projectName => {
    const projectIndex = projectList.findIndex(project => project.name === projectName);

    if (projectIndex !== -1) {
      projectList.splice(projectIndex, 1);
    }
  };

  return { addProject, removeProject };
})();

export default todoList;
