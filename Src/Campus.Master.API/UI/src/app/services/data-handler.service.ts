import { Injectable } from '@angular/core';
import { Task } from 'app/models/task-list/task';
import { Observable } from 'rxjs';
import { TaskDAOArray } from '../data/dao/impl/TaskDAOArray';
import { Project } from '../models/task-list/project';
import { CategoryDAOArray } from '../data/dao/impl/CategoryDAOArray';
import { Priority } from '../models/task-list/priority';
import { PriorityDAOArray } from '../data/dao/impl/PriorityDAOArray';
import { Status } from '../models/task-list/status';
import { StatusDAOArray } from '../data/dao/impl/StatusDAOArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskDaoArray = new TaskDAOArray();
  categoryDaoArray = new CategoryDAOArray();
  priorityDaoArray = new PriorityDAOArray();
  statusDaoArray = new StatusDAOArray();

  constructor() {
  }

  getAllTask(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getAllProjects(): Observable<Project[]> {
    return this.categoryDaoArray.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }

  getAllStatuses(): Observable<Status[]> {
    return this.statusDaoArray.getAll();
  }

  searchTasks(category: Project, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task);
  }

  addCategory(title: string): Observable<Project> {
    return this.categoryDaoArray.add(new Project(null, title, null, 1));
  }

  updateCategory(category: Project): Observable<Project> {
    return this.categoryDaoArray.update(category);
  }

  searchCategories(title: string): Observable<Project[]> {
    return this.categoryDaoArray.search(title);
  }

  getTotalCountInCategory(category: Project): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category);
  }

  getCompletedCountInCategory(category: Project): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }

  getUncompletedCountInCategory(category: Project): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(null);
  }
}
