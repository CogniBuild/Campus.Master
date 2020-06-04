import {Priority} from '../model/priority';
import {Category} from '../model/category';
import {Status} from '../model/status';

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
