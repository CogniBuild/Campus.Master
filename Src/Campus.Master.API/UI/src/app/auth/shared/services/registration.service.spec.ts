import { RegistrationService } from './registration.service';
import { RegisterUser } from '../models/register-user';
import { StateTransfer } from '@shared-models/state-transfer';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('registerUser()', () => {
  let httpTestingController: HttpTestingController;
  let registrationService: RegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    registrationService = TestBed.inject(RegistrationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  test('should return state transfer when user created', () => {
    const mockStateTransfer: StateTransfer = { message: 'state', payload: 'api/profile' };

    const mockUser: RegisterUser = {
      password: 'Campus321',
      confirmPassword: 'Campus321',
      email: 'yep@some.com',
      firstName: 'firstName',
      lastName: 'lastName',
      gender: 1
    };

    registrationService.registerUser(mockUser)
      .subscribe(stateTransfer => {
          expect(stateTransfer).toEqual(mockStateTransfer);
        }
      );

    const req = httpTestingController.expectOne('/api/profile/create');
    expect(req.request.method).toEqual('POST');

    req.flush(mockStateTransfer);
  });
});
