import { CommonDAO } from './CommonDAO';
import { Task } from '../../../models/task-list/task';
import { Project } from '../../../models/task-list/project';
import { Observable } from 'rxjs';
import { Priority } from '../../../models/task-list/priority';

export interface TaskDAO extends CommonDAO<Task> {

  search(category: Project, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  getCompletedCountInCategory(category: Project): Observable<number>;

  getUncompletedCountInCategory(category: Project): Observable<number>;

  getTotalCountInCategory(category: Project): Observable<number>;

  getTotalCount(): Observable<number>;
}
