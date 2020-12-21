import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticatedUser } from '../auth/shared/models/authenticated-user';
import { HttpClient } from '@angular/common/http';
import { StateTransfer } from '../models/state-transfer';
import { ProfileInformation } from '../auth/shared/models/profile-information';
import { environment } from '../../environments/environment';

@Injectable()
export class SignInService {
  constructor(private http: HttpClient) {
  }

  login(user: AuthenticatedUser): Observable<StateTransfer> {
    return this.http.post<StateTransfer>(environment.authenticateProfile, user);
  }

  getProfileInformation(): Observable<ProfileInformation> {
    return this.http.get<ProfileInformation>(environment.getProfileInformation);
  }
}
