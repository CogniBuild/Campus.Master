import { CommonDAO } from './CommonDAO';
import { Observable } from 'rxjs';
import { ProjectModel } from '../../../model/Project';

export interface CategoryDAO extends CommonDAO<ProjectModel> {

  search(title: string): Observable<ProjectModel[]>;

}
