import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { FirstErrorPipe } from '../../../shared/pipes/first-error.pipe';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthState } from '../store/auth.reducer';
import { TranslateStubsModule } from '../mocks/translate-stubs.module';
import { MemoizedSelector } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { spinnerClass } from '../../../shared/spinner/spinner-class-names';
import { selectSignUpSpinnerState } from '../store';
import { AuthActions } from '../store/actions';

describe('RegistrationComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    let store: MockStore;
    let mockIsSignUpSpinnerOn: MemoizedSelector<AuthState, boolean>;


    const initialState = {
        isSignUpSpinnerOn: false
    } as AuthState

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SignUpComponent, FirstErrorPipe],
            imports: [TranslateStubsModule, ReactiveFormsModule, FormsModule],
            providers: [
                FormBuilder,
                provideMockStore({ initialState }),
            ]
        });

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;

        mockIsSignUpSpinnerOn = store.overrideSelector(selectSignUpSpinnerState, false);

        store.dispatch = jest.fn();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch signUp action when submit called', () => {
        // arrange    
        component.mapFormValues = jest.fn().mockReturnValue(null);
        // act        
        component.submit();
        // assert
        expect(store.dispatch).toHaveBeenCalledWith(
            AuthActions.signUp({ signUpModel: null }));
    })

    it.each([
        { isSpinnerOn: true, numberOfSpinners: 1 },
        { isSpinnerOn: false, numberOfSpinners: 0 }])
        // TODO: rewrite to printf formatting once jest will be updated
        ('should have spinner or not when isSpinnerOn true or false ',
            ({ isSpinnerOn, numberOfSpinners }) => {
                // arrange                
                mockIsSignUpSpinnerOn.setResult(isSpinnerOn);
                // act
                store.refreshState();
                fixture.detectChanges();
                // assert
                expect(
                    fixture.debugElement.queryAll(By.css(spinnerClass)).length)
                    .toBe(numberOfSpinners);
            });
});
