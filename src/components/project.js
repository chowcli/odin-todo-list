class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  checkDuplicate() {
    return this.tasks.some(task => task.name === taskObject.name);
  }

  insertTask(taskObject) {
    this.tasks.push(taskObject);
  }

  deleteTask(taskName) {
    const taskIndex = this.tasks.findIndex(task => task.name === taskName);

    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  removeAllTasks() {
    this.tasks = [];
  }

  findTaskIndex(taskName) {
    return this.tasks.some(task => task.name === taskName);
  }
}

export default Project;
