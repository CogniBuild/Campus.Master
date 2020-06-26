import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterUser, User } from '../shared/interfaces';
import { ConfirmPasswordValidator } from '../shared/confirmed.validator';
import { RegistrationService } from '../shared/services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.sass'],
})
export class RegistrationPageComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  // private auth: SignInService, private router: Router - add to constructor
  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        first_name: new FormControl(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        last_name: new FormControl(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
  }

  submit() {
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

    this.router.navigate(['/campus/dashboard']);

    // this.registrationService
    //  .registerUser(registerUser)
    //  .subscribe((data: any) => {
    //    if (data.message) {
    //      this.registerForm.reset();
    //    }
    //  });

    // this.auth.login(user).subscribe(() => {
    //  this.form.reset();
    //  this.router.navigate([]);
    // });
  }
}
