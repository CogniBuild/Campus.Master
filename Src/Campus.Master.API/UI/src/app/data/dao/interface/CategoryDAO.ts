import { CommonDAO } from './CommonDAO';
import { Observable } from 'rxjs';
import { Project } from '../../../model/Project';

export interface CategoryDAO extends CommonDAO<Project> {

  search(title: string): Observable<Project[]>;

}
