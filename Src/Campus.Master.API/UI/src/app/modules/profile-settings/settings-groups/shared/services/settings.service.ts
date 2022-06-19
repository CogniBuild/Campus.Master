import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileInfo } from '../../../../auth/shared/models';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<ProfileInfo> {
    return this.http.get<ProfileInfo>(environment.getProfileInformation);
  }

  // tslint:disable-next-line: no-any
  setUserName(fullName): Observable<any> {
    return this.http.put(environment.getProfileInformation, {
      FullName: fullName
    });
  }
}
