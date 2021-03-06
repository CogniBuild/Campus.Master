import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmPasswordValidator } from '../confirmed.validator';
import { RegistrationService } from '../shared/services/registration.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, zip } from 'rxjs';
import { RegisterUser } from '../shared/models';
import { LocaleService } from '../../../core/services/locale.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  spinner: boolean;
  param = { minlength: 8, maxlength: 100 };

  private registerUser$: Subscription = new Subscription();

  private toastStyles = {
    toastClass: 'ngx-toastr server-error-toastr'
  };

  private responseLocaleMap = {
    'User already exists': 'AUTH.ERROR-TOASTR.USER-EXISTS',
    'Failed to create new user': 'AUTH.ERROR-TOASTR.NEW-USER'
  };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private localeService: LocaleService,
    private registrationService: RegistrationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        first_name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z]*')
        ]),
        last_name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z]*')
        ]),
        nickname: new FormControl(null, [
          Validators.required,
          Validators.maxLength(250)
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          Validators.pattern('(?=.*[0-9])(?=.*[A-Z]).{8,}')
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
        ])
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
  }

  ngOnDestroy(): void {
    this.registerUser$.unsubscribe();
  }

  submit() {
    this.spinner = true;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const registerUser: RegisterUser = {
      fullName: this.registerForm.value.first_name + ' ' + this.registerForm.value.last_name,
      userName: this.registerForm.value.nickname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    };
    this.registerUser$ = this.registrationService
      .registerUser(registerUser)
      .subscribe((token) => {
        localStorage.setItem('token', token);
        this.registerForm.reset();
        this.router.navigate(['/campus']);
      }, (errorResponse: HttpErrorResponse) => {
        const msgLocale$ = errorResponse.status === 400 ?
          zip(this.localeService.get(this.responseLocaleMap[errorResponse.error]),
            this.localeService.get('AUTH.ERROR-TOASTR.HEADER')) :
          zip(this.localeService.get('AUTH.ERROR-TOASTR.SERVER-ERROR'),
            this.localeService.get('AUTH.ERROR-TOASTR.HEADER'));

        msgLocale$.toPromise().then(([message, header]) => this.toastr.error(message, header, this.toastStyles));
        this.spinner = false;
      });
  }
}
