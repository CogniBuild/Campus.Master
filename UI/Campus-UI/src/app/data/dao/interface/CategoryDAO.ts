import { CommonDAO } from './CommonDAO';
import { Observable } from 'rxjs';
import { Category } from '../../../model/category';

export interface CategoryDAO extends CommonDAO<Category> {

  search(title: string): Observable<Category[]>;

}
