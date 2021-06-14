import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileInformation } from '../../../../auth/shared/models';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<ProfileInformation> {
    return this.http.get<ProfileInformation>(environment.getProfileInformation);
  }

  setUserName(fullName): Observable<any> {
    return this.http.put(environment.getProfileInformation, {
      FullName: fullName
    });
  }
}
