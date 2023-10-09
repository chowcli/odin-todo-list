import { shortenUUID } from "./reuseFunc";

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = shortenUUID();
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  checkDuplicate(taskName) {
    return this.tasks.some(task => task.name === taskName);
  }

  insertTask(taskObject) {
    this.tasks.push(taskObject);
  }

  deleteTask(taskID) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskID);

    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  findTaskIndex(taskID) {
    return this.tasks.some(task => task.id === taskID);
  }
}

export default Project;
