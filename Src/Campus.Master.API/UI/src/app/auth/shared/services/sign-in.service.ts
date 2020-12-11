import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { User } from '../models/user';
import { StateTransfer } from '../../../models/state-transfer';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignInService {
  constructor(private http: HttpClient) { }

  login(user: User): Observable<StateTransfer> {
    return this.http.post<StateTransfer>(environment.authenticateProfile, user);
  }
}
