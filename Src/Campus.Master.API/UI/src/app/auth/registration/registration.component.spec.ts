import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;

    const formGroup = {
        group: jest.fn()
    } as any;

    const registrationService = {
        registerUser: jest.fn()
    } as any;

    const router = {
        navigate: jest.fn()
    } as any;

    const toastr = {
      error: jest.fn()
    } as any;

    const localeService = {
      get: jest.fn()
    } as any;

    beforeAll(() => {
        component = new RegistrationComponent(
            formGroup,
            toastr,
            localeService,
            registrationService,
            router
        );
    });

    beforeEach(() => { });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
