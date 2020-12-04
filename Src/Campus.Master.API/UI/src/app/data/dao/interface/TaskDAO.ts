import { CommonDAO } from './CommonDAO';
import { Task } from '../../../shared/models/task';
import { Project } from '../../../shared/models/project';
import { Observable } from 'rxjs';
import { Priority } from '../../../shared/models/priority';

export interface TaskDAO extends CommonDAO<Task> {

  search(category: Project, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  getCompletedCountInCategory(category: Project): Observable<number>;

  getUncompletedCountInCategory(category: Project): Observable<number>;

  getTotalCountInCategory(category: Project): Observable<number>;

  getTotalCount(): Observable<number>;
}
