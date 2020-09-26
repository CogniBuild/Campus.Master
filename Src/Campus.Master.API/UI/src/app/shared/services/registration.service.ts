import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { RegisterUser, StateTransfer } from '../interfaces';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) {
  }

  registerUser(user: RegisterUser): Observable<StateTransfer> {
    const uri = environment.createProfilePath;

    return this.httpClient.post<StateTransfer>(uri, user).pipe(
      map((res) => {
        localStorage.setItem('token', res.message);
        return res;
      }),
      catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error;

    switch (message) {
      case 'User already exists.':
        this.error$.next('User already exists.');
        break;
    }
    return throwError(message);
  }
}
