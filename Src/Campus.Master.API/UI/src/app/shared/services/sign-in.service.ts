import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, StateTransfer } from '../interfaces';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SignInService {
  constructor(private http: HttpClient) { }

  get token(): string {
    return '';
  }

  login(user: User): Observable<StateTransfer> {
    const uri: string = environment.authenticateProfile;

    return this.http.post<StateTransfer>(uri, user).pipe(map((res) => {
      localStorage.setItem('token', res.message);
      return res;
    }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
