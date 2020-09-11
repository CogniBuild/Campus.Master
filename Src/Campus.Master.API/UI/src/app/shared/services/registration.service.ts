import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser, StateTransfer } from '../interfaces';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) { }

  registerUser(user: RegisterUser): Observable<StateTransfer> {
    const uri = environment.createProfilePath;

    return this.httpClient.post<StateTransfer>(uri, user).pipe(map((res) => {
      localStorage.setItem('token', res.message);
      return res;
    }));
  }
}
