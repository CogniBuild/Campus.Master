import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInCredentials, ProfileInfo } from '../../modules/auth/shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class SignInService {
  constructor(private http: HttpClient) {
  }

  login(user: SignInCredentials): Observable<string> {
    return this.http.post<string>(environment.authenticateProfile, user);
  }

  getProfileInformation(): Observable<ProfileInfo> {
    return this.http.get<ProfileInfo>(environment.getProfileInformation);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(environment.isUserAuthenticated);
  }
}
