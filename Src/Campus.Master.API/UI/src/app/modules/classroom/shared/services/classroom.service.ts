import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';
import { classrooms } from '../model/mockData';
import { Classroom } from '../model/classrooms';
import { ProfileInformation } from '../../../auth/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  public classrooms = classrooms;

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<ProfileInformation> {
    return this.http.get<ProfileInformation>(environment.getProfileInformation);
  }

  getClassroom(id): Classroom {
    return this.classrooms.filter(x => x.id === id)[0];
  }
}
