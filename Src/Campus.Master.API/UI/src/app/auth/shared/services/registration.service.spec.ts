import { RegistrationService } from './registration.service';
import { RegisterUser } from '../models/register-user';
import { StateTransfer } from '@shared-models/state-transfer';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('registerUser()', () => {
  let httpTestingController: HttpTestingController;
  let registrationService: RegistrationService;

  const mockUser: RegisterUser = {
    password: 'Campus321',
    confirmPassword: 'Campus321',
    email: 'example@example.com',
    firstName: 'firstName',
    lastName: 'lastName',
    gender: 1
  };

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

    registrationService.registerUser(mockUser)
      .subscribe(stateTransfer => {
          expect(stateTransfer).toEqual(mockStateTransfer);
        }
      );

    const req = httpTestingController.expectOne('/api/profile/create');
    expect(req.request.method).toMatch('POST');

    req.flush(mockStateTransfer);
  });

  test('should failed with 400 error when user exists', (done) => {
    const errorMsg = 'User already exists';

    registrationService.registerUser(mockUser)
      .subscribe((_) => {
          fail('should have failed with 400 error');
          done();
        },
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.error).toEqual(errorMsg);
          done();
        }
      );

    const req = httpTestingController.expectOne('/api/profile/create');
    expect(req.request.method).toMatch('POST');

    req.flush(errorMsg, { status: 400, statusText: 'Bad Request' });
  });
});
