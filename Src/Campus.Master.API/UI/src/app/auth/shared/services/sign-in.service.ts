import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { StateTransfer } from '@sharedModels/state-transfer';

@Injectable()
export class SignInService {
  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<StateTransfer> {
    return this.http.post<StateTransfer>(environment.authenticateProfile, user);
  }
}
