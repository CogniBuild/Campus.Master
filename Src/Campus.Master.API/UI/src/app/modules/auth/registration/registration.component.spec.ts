import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;

    const formBuilder = {
        group: jest.fn()
    } as any;

    const store = {
        dispatch: jest.fn(),
        pipe: jest.fn()
    } as any;

    beforeAll(() => {
        component = new RegistrationComponent(
            formBuilder,
            store,
        );
    });

    beforeEach(() => { });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
