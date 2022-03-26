import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private router: Router
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.form.value;
    this.authService.login(val.login, val.password)
      .subscribe({
        error: () => alert('Login failed'),
        next: (d: any) => localStorage.setItem('token', d.token)
      })
  }

}
