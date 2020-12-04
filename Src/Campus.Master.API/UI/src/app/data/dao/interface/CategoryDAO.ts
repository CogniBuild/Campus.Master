import { CommonDAO } from './CommonDAO';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/project';

export interface CategoryDAO extends CommonDAO<Project> {

  search(title: string): Observable<Project[]>;

}
