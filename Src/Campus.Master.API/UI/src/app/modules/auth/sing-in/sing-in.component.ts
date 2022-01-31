import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInCredentials } from '../shared/models';
import { select, Store } from '@ngrx/store';
import { AuthActions } from '../store/actions';
import { selectSignInSpinnerState } from '../store/auth.selectors';
@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.sass'],
})
export class SingInComponent implements OnInit {
  form: FormGroup;
  isSpinnerOn$ = this.store.pipe(select(selectSignInSpinnerState));
  param = { minlength: 8 };

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  submit() {
    const user: SignInCredentials = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.store.dispatch(AuthActions.signInUser({ signInModel: user }));
  }
}
