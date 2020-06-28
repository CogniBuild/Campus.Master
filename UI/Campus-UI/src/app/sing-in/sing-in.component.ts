import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/interfaces';
import { SignInService } from '../shared/services/sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.sass']
})
export class SingInComponent implements OnInit {

  form: FormGroup;

  constructor(private auth: SignInService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.router.navigate(['/campus/dashboard']);

    // this.auth.login(user).subscribe(() => {
    //  this.form.reset();
    //  this.router.navigate(['/campus/dashboard']);
    // });
  }
}
