import { Priority } from '../model/priority';
import { ProjectModel } from './Project';
import { Status } from '../model/status';

export class Task {
  id: number;
  title: string;
  // completed: boolean;
  status?: Status;
  priority?: Priority;
  date?: Date;
  category?: ProjectModel;

  constructor(id: number, title: string, status?: Status, priority?: Priority, date?: Date, category?: ProjectModel) {
    this.id = id;
    this.title = title;
    // this.completed = completed;
    this.status = status;
    this.priority = priority;
    this.date = date;
    this.category = category;
  }
}
