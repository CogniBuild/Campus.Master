import { CommonDAO } from './CommonDAO';
import { Task } from '../../../model/task';
import { Category } from '../../../model/category';
import { Observable } from 'rxjs';
import { Priority } from '../../../model/priority';

export interface TaskDAO extends CommonDAO<Task> {

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  // кол-во завершенных задач в заданной категории (если category === null, то для всех категорий)
  getCompletedCountInCategory(category: Category): Observable<number>;

  // кол-во незавершенных задач в заданной категории (если category === null, то для всех категорий)
  getUncompletedCountInCategory(category: Category): Observable<number>;

  // кол-во всех задач в заданной категории (если category === null, то для всех категорий)
  getTotalCountInCategory(category: Category): Observable<number>;

  // кол-во всех задач в общем
  getTotalCount(): Observable<number>;
}
