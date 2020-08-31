import { CategoryDAO } from '../interface/CategoryDAO';
import { ProjectModel } from '../../../model/Project';
import { Observable, of } from 'rxjs';
import { TestData } from '../../testData';

export class CategoryDAOArray implements CategoryDAO {

  add(category: ProjectModel): Observable<ProjectModel> {

    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }

    TestData.categories.push(category);

    return of(category);
  }

  getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
  }

  delete(id: number): Observable<ProjectModel> {
    return undefined;
  }

  get(id: number): Observable<ProjectModel> {
    return undefined;
  }

  getAll(): Observable<ProjectModel[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<ProjectModel[]> {

    return of(TestData.categories.filter(
      cat => cat.name.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.name.localeCompare(c2.name)));
  }

  update(category: ProjectModel): Observable<ProjectModel> {

    const tmpCategory = TestData.categories.find(t => t.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);

    return of(tmpCategory);
  }

}
