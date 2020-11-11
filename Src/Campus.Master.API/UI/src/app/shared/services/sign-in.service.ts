import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, StateTransfer } from '../interfaces';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable()
export class SignInService {
  constructor(private http: HttpClient) { }

  login(user: User): Observable<StateTransfer> {
    return this.http.post<StateTransfer>(environment.authenticateProfile, user);
  }
}
