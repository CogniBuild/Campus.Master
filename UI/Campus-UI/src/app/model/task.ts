import {Priority} from './Priority';
import {Category} from './Category';
import {Status} from './status';

export class Task {
  id: number;
  title: string;
  completed: boolean;
  status?: Status;
  priority?: Priority;
  date?: Date;
  category?: Category;

  constructor(id: number, title: string, completed: boolean, status?: Status, priority?: Priority, date?: Date, category?: Category) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.status = status;
    this.priority = priority;
    this.date = date;
    this.category = category;
  }
}
