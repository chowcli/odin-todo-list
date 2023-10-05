import { shortenUUID } from "./reuseFunc";

class Task {
  constructor(name, details, dueDate, priority) {
    this.name = name;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = shortenUUID();
    this.completed = false;
  }

  editInfo(name, details, dueDate, priority) {
    this.name = name;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  get completed() {
    return this._completed;
  }

  set completed(booleanValue) {
    this._completed = booleanValue;
  }
}

export default Task;
