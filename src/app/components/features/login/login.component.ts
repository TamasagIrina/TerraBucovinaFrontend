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

  login(username: string, password: string) {

    console.log(username, password);

    this.authService.login(username, password).subscribe({
      next: (res) => {
        console.log('OK', res);
        localStorage.setItem('access_token', res);
      },
      error: (err) => console.error('Eroare login', err)
    });

  
  }

}
