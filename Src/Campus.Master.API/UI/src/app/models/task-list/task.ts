import { Priority } from './priority';
import { Project } from './project';
import { Status } from './status';

export class Task {
  id: number;
  title: string;
  status?: Status;
  priority?: Priority;
  date?: Date;
  category?: Project;

  constructor(id: number, title: string, status?: Status, priority?: Priority, date?: Date, category?: Project) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.priority = priority;
    this.date = date;
    this.category = category;
  }
}
