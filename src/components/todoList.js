const todoList = (() => {
  // array of project object
  const projectList = [];

  const checkDuplicate = projectName => {
    return projectList.some(project => project.name === projectName);
  };

  const addProject = project => {
    projectList.push(project);
  };

  const removeProject = projectId => {
    const projectIndex = findProjectIndex(projectId);

    if (projectIndex !== -1) {
      projectList.splice(projectIndex, 1);
    }
  };

  const findProjectIndex = projectId => {
    return projectList.findIndex(project => project.id === projectId);
  };

  const getProjectObject = projectId => {
    const projectIndex = findProjectIndex(projectId);

    return projectList[projectIndex];
  };

  return {
    projectList,
    checkDuplicate,
    addProject,
    removeProject,
    getProjectObject,
  };
})();

export default todoList;
