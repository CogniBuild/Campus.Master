import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from 'src/app/model/Project';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllUserProjects(): Observable<ProjectModel[]> {
    let uri: string = environment.apiRoot + environment.getProjects + `page=${1}&items=${20}`;    

    return this.http.get<ProjectModel[]>(uri);
  }
}
