import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser, StateTransfer } from '../interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  registerUser(user: RegisterUser): Observable<StateTransfer> {
    return this.httpClient.post<StateTransfer>(environment.createProfilePath, user);
  }
}
