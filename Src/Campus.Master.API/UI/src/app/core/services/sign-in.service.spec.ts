import { SignInService } from './sign-in.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticatedUser, ProfileInformation } from '../../modules/auth/shared/models';
import { StateTransfer } from '@shared/models/state-transfer';
import { HttpErrorResponse } from '@angular/common/http';

describe('SignInService', () => {

  let signInService: SignInService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignInService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    signInService = TestBed.inject(SignInService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('login()', () => {

    test('should return state transfer when user logged in', () => {
      const mockResponse: StateTransfer = {
        message: 'token',
        payload: 'api/profile'
      };

      const authenticatedUserMock: AuthenticatedUser = {
        email: 'exmple@example.com',
        password: 'Password321'
      };

      signInService.login(authenticatedUserMock).subscribe(response =>
        expect(response).toEqual(mockResponse));

      const req = httpTestingController.expectOne('/api/profile/auth');
      expect(req.request.method).toMatch('POST');

      req.flush(mockResponse);
    });

    test('should respond with 400 error when wrong email or password', (done) => {

      const unauthenticatedUserMock: AuthenticatedUser = {
        email: 'wrong email',
        password: 'wrong password'
      };

      const errorMessage = 'Wrong email or password.';

      signInService.login(unauthenticatedUserMock)
        .subscribe(_ => {
            fail('should have failed with 400 error');
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toBe(400);
            expect(error.error).toEqual(errorMessage);
            done();
          });

      const req = httpTestingController.expectOne('/api/profile/auth');
      expect(req.request.method).toMatch('POST');

      req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('getProfileInformation()', () => {

    test('should return profile information when user exists', () => {
      const registeredUserMock: ProfileInformation = {
        email: 'exmple@example.com',
        firstName: 'firstName',
        lastName: 'lastName'
      };

      signInService.getProfileInformation()
        .subscribe(response => {
          expect(response).toEqual(registeredUserMock);
        });

      const req = httpTestingController.expectOne('/api/profile');
      expect(req.request.method).toMatch('GET');

      req.flush(registeredUserMock);
    });

    test('should respond with 400 error when unauthorized', (done) => {
      const errorMessage = 'Failed to identify user.';

      signInService.getProfileInformation()
        .subscribe(_ => {
          fail('should have failed with 400 error');
          done();
        }, (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.error).toEqual(errorMessage);
          done();
        });

      const req = httpTestingController.expectOne('/api/profile');
      expect(req.request.method).toMatch('GET');

      req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
    });
  });
});
