import { CommonDAO } from './CommonDAO';
import { Task } from '../../../model/task';
import { ProjectModel } from '../../../model/Project';
import { Observable } from 'rxjs';
import { Priority } from '../../../model/priority';

export interface TaskDAO extends CommonDAO<Task> {

  search(category: ProjectModel, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  // кол-во завершенных задач в заданной категории (если category === null, то для всех категорий)
  getCompletedCountInCategory(category: ProjectModel): Observable<number>;

  // кол-во незавершенных задач в заданной категории (если category === null, то для всех категорий)
  getUncompletedCountInCategory(category: ProjectModel): Observable<number>;

  // кол-во всех задач в заданной категории (если category === null, то для всех категорий)
  getTotalCountInCategory(category: ProjectModel): Observable<number>;

  // кол-во всех задач в общем
  getTotalCount(): Observable<number>;
}
