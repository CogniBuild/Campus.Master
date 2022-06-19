import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { classrooms } from '../model/mockData';
import { Classroom } from '../model/classrooms';
import { ProfileInfo } from '../../../auth/shared/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  public classrooms = classrooms;

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<ProfileInfo> {
    return this.http.get<ProfileInfo>(environment.getProfileInformation);
  }

  getClassrooms(): Observable<Classroom[]> {
    return of(this.classrooms);
  }

  getClassroom(id): Classroom {
    return classrooms.filter(x => x.id === id)[0];
  }

  deleteClassroom(id): Observable<Classroom[]> {
    const index = classrooms.findIndex((classroom: Classroom) => classroom.id === id);
    classrooms.splice(index, 1);
    return of(classrooms);
  }
}
