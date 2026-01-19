import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { Store } from '@ngrx/store';
import * as NotificationActions from '../../core/store/notification/notification.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, MatIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  signup = false;
  showPassword1 = false;
  showPassword2 = false;

  signupForm: FormGroup;
  signinForm: FormGroup;
  loginError = false;
  loginSuccess = false;
  missingFields = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private store: Store, private router: Router) {
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

  register(username: string, password: string, email: string, termsAccepted: boolean) {

    if (!username || !password || !email) {
      this.store.dispatch(
        NotificationActions.showNotification({
          message: 'Te rugăm să completezi toate câmpurile.',
          notificationType: 'error',
        })
      );
      return;
    }

    if (!termsAccepted) {
      this.store.dispatch(
        NotificationActions.showNotification({
          message: 'Trebuie să accepți termenii și condițiile.',
          notificationType: 'error',
        })
      );
      return;
    }

    this.authService.register(username, password, email, termsAccepted).subscribe({
      next: (res) => {
        if (res === "User already exists" || res === "Invalid registration data") {
          this.store.dispatch(
            NotificationActions.showNotification({
              message: "Aveți deja cont sau email-ul este utilizat",
              notificationType: 'error',
            })
          );
          return;
        }

        this.store.dispatch(
          NotificationActions.showNotification({
            message: 'Contul a fost creat cu succes!',
            notificationType: 'success',
          })
        );

        setTimeout(() => {
          this.signup = false;
          this.store.dispatch(NotificationActions.hideNotification());
        }, 2000);
      },
      error: () => {
        this.store.dispatch(
          NotificationActions.showNotification({
            message: 'A apărut o eroare la înregistrare.',
            notificationType: 'error',
          })
        );
      }
    });
  }


  resetMessages(): void {
    this.store.dispatch(NotificationActions.hideNotification());
  }

  login(email: string, password: string) {
    if (!email || !password) {
      this.store.dispatch(
        NotificationActions.showNotification({
          message: 'Te rugăm să completezi toate câmpurile.',
          notificationType: 'error',
        })
      );

      setTimeout(() => {
        this.store.dispatch(NotificationActions.hideNotification());
      }, 3000);

      return;
    }

    this.authService.login(email, password).subscribe({
      next: (res) => {
        if (res === "Invalid username or password") {
          this.store.dispatch(
            NotificationActions.showNotification({
              message: 'Parola sau email incorect!',
              notificationType: 'error',
            })
          );
          return;
        }


        this.authService.saveToken(res);
        this.store.dispatch(
          NotificationActions.showNotification({
            message: 'Sunteți logat în cont!',
            notificationType: 'success',
          })
        );
        setTimeout(() => {
          this.router.navigateByUrl('/shop');
          this.store.dispatch(NotificationActions.hideNotification());
        }, 1000);
      },
      error: (err) => {
        console.error('Eroare login', err);

        if (err.status === 401 || err.status === 403) {
          this.store.dispatch(
            NotificationActions.showNotification({
              message: 'Parola sau email incorect!',
              notificationType: 'error',
            })
          );

          setTimeout(() => {
            this.store.dispatch(NotificationActions.hideNotification());
          }, 3000);

          return;
        }

        this.store.dispatch(
          NotificationActions.showNotification({
            message: 'A apărut o eroare de rețea sau server.',
            notificationType: 'error',
          })
        );
      }
    });
  }





}
