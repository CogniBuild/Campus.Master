import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticatedUser, ProfileInformation } from '../../modules/auth/shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class SignInService {
  constructor(private http: HttpClient) {
  }

  login(user: AuthenticatedUser): Observable<string> {
    return this.http.post<string>(environment.authenticateProfile, user);
  }

  getProfileInformation(): Observable<ProfileInformation> {
    return this.http.get<ProfileInformation>(environment.getProfileInformation);
  }
}
