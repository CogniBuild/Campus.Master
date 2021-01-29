import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RegisterUser } from '../models/register-user';
import { StateTransfer } from '@shared/models/state-transfer';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) { }

  registerUser(user: RegisterUser): Observable<StateTransfer> {
    return this.httpClient.post<StateTransfer>(environment.createProfilePath, user);
  }
}
