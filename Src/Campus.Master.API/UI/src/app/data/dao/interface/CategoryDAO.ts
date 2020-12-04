import { CommonDAO } from './CommonDAO';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/task-list/project';

export interface CategoryDAO extends CommonDAO<Project> {

  search(title: string): Observable<Project[]>;

}
