import { RegistrationPageComponent } from './registration-page.component';

describe('SingInComponent', () => {
    let component: RegistrationPageComponent;

    /* tslint:disable:no-any */
    const formGroup = {
        group: jest.fn()
    } as any;

    const registrationService = {
        registerUser: jest.fn()
    } as any;

    const router = {
        navigate: jest.fn()
    } as any;
    /* tslint:enable:no-any */

    beforeAll(() => {
        component = new RegistrationPageComponent(
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
