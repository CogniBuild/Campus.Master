import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from '../../core/sign-in.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticatedUser } from '../shared/models/authenticated-user';
import { StateTransfer } from '../../models/state-transfer';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.sass'],
})
export class SingInComponent implements OnInit, OnDestroy {
  form: FormGroup;
  spinner: boolean;
  errorMessage: string;

  private signInUser$: Subscription = new Subscription();

  constructor(public auth: SignInService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  ngOnDestroy(): void {
    this.signInUser$.unsubscribe();
  }

  submit() {
    this.spinner = true;
    const user: AuthenticatedUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.signInUser$ = this.auth.login(user).subscribe(
      (data: StateTransfer) => {
        localStorage.setItem('token', data.message);
        this.form.reset();
        this.router.navigate(['/campus']);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errorMessage = errorResponse.error;
        this.spinner = false;
        this.form.reset({ email: user.email});
      }
    );
  }
}
