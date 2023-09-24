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

  insertTask(taskObject) {
    const avoidDuplicateTask = () => {
      return this.tasks.some(task => task.name === taskObject.name);
    };

    if (!avoidDuplicateTask()) {
      this.tasks.push(taskObject);
    }
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
}

export default Project;
