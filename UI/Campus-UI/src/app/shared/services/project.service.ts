import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from 'src/app/model/Project';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateTransfer } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllUserProjects(page: number, items: number): Observable<ProjectModel[]> {
    const uri: string = environment.apiRoot + environment.projects + `?page=${page}&items=${items}`;

    return this.http.get<ProjectModel[]>(uri);
  }

  createNewProject(projectName: string) {
    const uri: string = environment.apiRoot + environment.projects;

    return this.http.post<StateTransfer>(uri, { name: projectName, color: '.', status: 1 });
  }
}
