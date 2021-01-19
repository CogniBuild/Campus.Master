import { RegistrationComponent } from './registration.component';

describe('SingInComponent', () => {
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

    beforeAll(() => {
        component = new RegistrationComponent(
            formGroup,
            registrationService,
            router
        );
    });

    beforeEach(() => { });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
