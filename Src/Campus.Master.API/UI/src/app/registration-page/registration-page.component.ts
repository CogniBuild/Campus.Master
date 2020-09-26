import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterUser, User, StateTransfer } from '../shared/interfaces';
import { ConfirmPasswordValidator } from '../shared/confirmed.validator';
import { RegistrationService } from '../shared/services/registration.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.sass'],
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  private registerUser$: Subscription = new Subscription();
  spinner: boolean;

  // private auth: SignInService, private router: Router - add to constructor
  constructor(
    private fb: FormBuilder,
    public registrationService: RegistrationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        first_name: new FormControl(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        last_name: new FormControl(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*?[0-9])(?=.*?[A-Z]).{8,}.+')
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
        ]),
      },
      {validator: ConfirmPasswordValidator.MatchPassword}
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
      login: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      email: this.registerForm.value.email,
      firstName: this.registerForm.value.first_name,
      lastName: this.registerForm.value.last_name,
    };
    this.registerUser$ = this.registrationService
      .registerUser(registerUser)
      .subscribe((data: StateTransfer) => {
        this.registerForm.reset();
        this.router.navigate(['/campus/dashboard']);
      }, (errorResponse: HttpErrorResponse) => {
        this.spinner = false;
      });
  }
}
