import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SignUpComponent } from './sign-up.component';
import { FirstErrorPipe } from '../../../shared/pipes/first-error.pipe';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthState } from '../store/auth.reducer';
import { TranslateStubsModule } from '../mocks/translate-stubs.module';
import { MemoizedSelector } from '@ngrx/store';

describe('RegistrationComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    let formBuilderStub: Partial<FormBuilder>;
    let translateServiceStub: Partial<TranslateService>;
    let store: MockStore;
    let isSignUpSpinnerOnMock: MemoizedSelector<AuthState, boolean>;


    const initialState = {
        isSignUpSpinnerOn: false
    } as AuthState

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SignUpComponent, FirstErrorPipe],
            imports: [TranslateStubsModule, ReactiveFormsModule],
            providers: [
                { provide: FormBuilder, useValue: formBuilderStub },
                provideMockStore({ initialState }),
                { provide: TranslateService, useValue: translateServiceStub },
            ]
        });

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
