import { SignInService } from './sign-in.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticatedUser } from '../auth/shared/models/authenticated-user';
import { StateTransfer } from '@shared-models/state-transfer';

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
});
