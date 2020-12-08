import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/user/register-user';
import { StateTransfer } from '../models/state-transfer';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) { }

  registerUser(user: RegisterUser): Observable<StateTransfer> {
    return this.httpClient.post<StateTransfer>(environment.createProfilePath, user);
  }
}
