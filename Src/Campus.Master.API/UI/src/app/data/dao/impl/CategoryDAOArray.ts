import { CategoryDAO } from '../interface/CategoryDAO';
import { Project } from '@shared-models/task-list/project';
import { Observable, of } from 'rxjs';
import { TestData } from '../../testData';

export class CategoryDAOArray implements CategoryDAO {

  add(category: Project): Observable<Project> {

    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }

    TestData.categories.push(category);

    return of(category);
  }

  getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
  }

  delete(id: number): Observable<Project> {
    return undefined;
  }

  get(id: number): Observable<Project> {
    return undefined;
  }

  getAll(): Observable<Project[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Project[]> {

    return of(TestData.categories.filter(
      cat => cat.name.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.name.localeCompare(c2.name)));
  }

  update(category: Project): Observable<Project> {

    const tmpCategory = TestData.categories.find(t => t.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);

    return of(tmpCategory);
  }

}
