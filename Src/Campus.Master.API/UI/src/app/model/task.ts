import { Priority } from '../model/priority';
import { Project } from './Project';
import { Status } from '../model/status';

export class Task {
  id: number;
  title: string;
  // completed: boolean;
  status?: Status;
  priority?: Priority;
  date?: Date;
  category?: Project;

  constructor(id: number, title: string, status?: Status, priority?: Priority, date?: Date, category?: Project) {
    this.id = id;
    this.title = title;
    // this.completed = completed;
    this.status = status;
    this.priority = priority;
    this.date = date;
    this.category = category;
  }
}
