import { CommonDAO } from './CommonDAO';
import { Task } from '../../../model/task';
import { Project } from '../../../model/Project';
import { Observable } from 'rxjs';
import { Priority } from '../../../model/priority';

export interface TaskDAO extends CommonDAO<Task> {

  search(category: Project, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  getCompletedCountInCategory(category: Project): Observable<number>;

  getUncompletedCountInCategory(category: Project): Observable<number>;

  getTotalCountInCategory(category: Project): Observable<number>;

  getTotalCount(): Observable<number>;
}
