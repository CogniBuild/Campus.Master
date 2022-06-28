import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AuthActions } from '../store/actions';
import { selectSignInSpinnerState } from '../store';
@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.sass'],
})
export class SingInComponent implements OnInit {
  form: FormGroup;
  isSpinnerOn$ = this.store.pipe(select(selectSignInSpinnerState));
  translateParams = { minlength: 8 };

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

  submit(email: string, password: string) {
    this.store.dispatch(AuthActions.signIn({
      signInModel: { email, password }
    }));
  }
}
