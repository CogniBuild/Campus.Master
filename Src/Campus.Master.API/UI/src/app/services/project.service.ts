import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/task-list/project';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateTransfer } from '../models/state-transfer';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllUserProjects(page: number, items: number): Observable<Project[]> {
    const uri: string = environment.projects + `?page=${page}&items=${items}`;

    return this.http.get<Project[]>(uri);
  }

  createNewProject(projectName: string) {
    const uri: string = environment.projects;

    return this.http.post<StateTransfer>(uri, { name: projectName, color: '.', status: 1 });
  }
}
