import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, StateTransfer} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable()
export class SignInService {
  constructor(private http: HttpClient) {
  }

  get token(): string {
    return '';
  }

  login(user: User): Observable<StateTransfer> {
    return this.http.post<StateTransfer>('', user);
  }

  logout() {

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken() {
  }
}
