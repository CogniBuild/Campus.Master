import { CommonDAO } from './CommonDAO';
import { Task } from '../../../model/task';
import { ProjectModel } from '../../../model/Project';
import { Observable } from 'rxjs';
import { Priority } from '../../../model/priority';

export interface TaskDAO extends CommonDAO<Task> {

  search(category: ProjectModel, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  getCompletedCountInCategory(category: ProjectModel): Observable<number>;

  getUncompletedCountInCategory(category: ProjectModel): Observable<number>;

  getTotalCountInCategory(category: ProjectModel): Observable<number>;

  getTotalCount(): Observable<number>;
}
