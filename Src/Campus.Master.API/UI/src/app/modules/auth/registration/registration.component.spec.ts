import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { RegistrationComponent } from './registration.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;

    let formBuilderStub: Partial<FormBuilder>;
    let storeStub: Partial<Store>;
    let translateServiceStub: Partial<TranslateService>;

    storeStub = {
        pipe: jest.fn()
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RegistrationComponent],
            imports: [SharedModule, RouterTestingModule],
            providers: [
                { provide: FormBuilder, useValue: formBuilderStub },
                { provide: Store, useValue: storeStub },
                { provide: TranslateService, useValue: translateServiceStub }
            ]
        });

        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
