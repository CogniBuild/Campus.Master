import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, StateTransfer } from '../interfaces';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable()
export class SignInService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }


  get token(): string {
    return '';
  }

  login(user: User): Observable<StateTransfer> {
    const uri: string = environment.authenticateProfile;

    return this.http.post<StateTransfer>(uri, user)
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.message);
          return res;
        }),
        catchError(this.handleError.bind(this)));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error;

    switch (message) {
      case 'Wrong username or password.':
        this.error$.next('Wrong username or password.');
        break;
    }

    return throwError(message);
  }
}
