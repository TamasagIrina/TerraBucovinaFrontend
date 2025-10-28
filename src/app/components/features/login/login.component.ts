import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../core/services/authService/auth-sevices.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  signup = false;


  signupForm: FormGroup;
  signinForm: FormGroup;
  loginError = false;
  loginSuccess = false;
  missingFields = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // initializezi ambele formulare
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  resetMessages(): void {
    this.loginError = false;
    this.loginSuccess = false;
    this.missingFields = false;
  }

  login(email: string, password: string) {

    console.log(email, password);

    this.loginError = false;
    this.loginSuccess = false;
    this.missingFields = false;

    if (!email || !password) {
      this.missingFields = true;
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (res) => {
        if (res == "Invalid username or password") {
          this.loginError = true;
        } else {
          localStorage.setItem('access_token', res);
          this.loginSuccess = true;
        }
        console.log('OK', res);

      },
      error: (err) => {
        console.error('Eroare login', err);
        this.loginError = true;
      }

    });


  }

  register(username: string, password: string, email: string) {

    console.log(username, password, email);

    this.loginError = false;
    this.loginSuccess = false;
    this.missingFields = false;

    if (!username || !password || !email) {
      this.missingFields = true;
      return;
    }

    this.authService.register(username, password, email).subscribe({
      next: (res) => {
        console.log('OK', res);
        this.loginSuccess = true;
      }, error: (err) => {
        console.error('Eroare login', err);
        this.loginError = true;
      }
    });


  }

}
