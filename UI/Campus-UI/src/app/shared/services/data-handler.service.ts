import { Injectable } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TestData } from '../../data/testData';
import { Observable } from 'rxjs';
import { TaskDAOArray } from '../../data/dao/impl/TaskDAOArray';
import { ProjectModel } from '../../model/Project';
import { CategoryDAOArray } from '../../data/dao/impl/CategoryDAOArray';
import { Priority } from '../../model/priority';
import { PriorityDAOArray } from '../../data/dao/impl/PriorityDAOArray';
import { Status } from '../../model/status';
import { StatusDAOArray } from '../../data/dao/impl/StatusDAOArray';

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

  getAllProjects(): Observable<ProjectModel[]> {
    return this.categoryDaoArray.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }

  getAllStatuses(): Observable<Status[]> {
    return this.statusDaoArray.getAll();
  }

  searchTasks(category: ProjectModel, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
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

  addCategory(title: string): Observable<ProjectModel> {
    return this.categoryDaoArray.add(new ProjectModel(null, title));
  }

  updateCategory(category: ProjectModel): Observable<ProjectModel> {
    return this.categoryDaoArray.update(category);
  }

  searchCategories(title: string): Observable<ProjectModel[]> {
    return this.categoryDaoArray.search(title);
  }

  getTotalCountInCategory(category: ProjectModel): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category);
  }

  getCompletedCountInCategory(category: ProjectModel): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }

  getUncompletedCountInCategory(category: ProjectModel): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(null);
  }
}
