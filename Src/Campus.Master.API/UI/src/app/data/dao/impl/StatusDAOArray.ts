import { Observable, of } from 'rxjs';
import { TestData } from '../../testData';
import { StatusDAO } from '../interface/StatusDAO';
import { Status } from '../../../models/task-list/status';

export class StatusDAOArray implements StatusDAO {

  add(T): Observable<Status> {
    return undefined;
  }

  delete(id: number): Observable<Status> {
    return undefined;
  }

  get(id: number): Observable<Status> {
    return undefined;
  }

  getAll(): Observable<Status[]> {
    return of(TestData.statuses);
  }

  update(T): Observable<Status> {
    return undefined;
  }

}
