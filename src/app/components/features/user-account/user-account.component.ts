import { Component } from '@angular/core';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { ApiService } from '../../core/services/api-service/api.service';
import { User } from '../../core/interfaces/user.interface';
import { Review } from '../../core/interfaces/review.inerface';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import * as NotificationActions from '../../core/store/notification/notification.actions';
import { loadReviews, deleteReview as deleteReviewAction } from '../../core/store/review/review.actions';
import { selectByUserId } from '../../core/store/review/review.selectors';
import { AddReviewDialogComponent, AddReviewDialogData, AddReviewDialogResult } from '../../shared/add-review-dialog/add-review-dialog.component';

@Component({
  selector: 'app-user-account',
  imports: [CommonModule,
     FormsModule
  ],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent {
  user: User | null = null;
  myReviews$: Observable<Review[]> = of([]);

  passwords = {
    current: '',
    newPass: '',
    confirm: ''
  };

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUser();

    this.store.dispatch(loadReviews());
    this.authService.getUserId().subscribe(userId => {
      if (userId) {
        this.myReviews$ = this.store.select(selectByUserId(userId));
      }
    });

    const passwordChanged = this.route.snapshot.queryParamMap.get('passwordChanged');
    if (passwordChanged === 'true') {
      this.notify('Parola a fost schimbată cu succes!', 'success');
    } else if (passwordChanged === 'false') {
      this.notify('Linkul de confirmare este invalid sau a expirat. Încearcă din nou.', 'error');
    }
  }

  private notify(message: string, notificationType: 'success' | 'error'): void {
    this.store.dispatch(NotificationActions.showNotification({ message, notificationType }));
    setTimeout(() => this.store.dispatch(NotificationActions.hideNotification()), 5000);
  }

  loadUser() {
    this.apiService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  updateUser(form: NgForm) {
    if (!this.user) return;

    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    this.apiService.updateCurrentUser({
      username: this.user.username,
      fullName: this.user.fullName ?? null,
      address: this.user.address ?? null
    }).subscribe({
      next: (updated) => {
        this.user = updated;
        this.notify('Modificările au fost salvate!', 'success');
      },
      error: (err) => {
        const message = err?.status === 409
          ? 'Acest username este deja folosit.'
          : 'Eroare la actualizarea datelor.';
        this.notify(message, 'error');
      }
    });

    if (this.passwords.newPass || this.passwords.confirm) {
      if (!this.passwords.current) {
        this.notify('Introdu parola actuală pentru a o putea schimba.', 'error');
        return;
      }

      if (this.passwords.newPass !== this.passwords.confirm) {
        this.notify('Parolele nu coincid!', 'error');
        return;
      }

      this.apiService.requestPasswordChange({
        currentPassword: this.passwords.current,
        newPassword: this.passwords.newPass
      }).subscribe({
        next: () => {
          this.notify('Verifică-ți email-ul pentru a confirma noua parolă.', 'success');
          this.passwords = { current: '', newPass: '', confirm: '' };
        },
        error: (err) => {
          const message = err?.status === 400
            ? 'Parola actuală este incorectă.'
            : 'Eroare la schimbarea parolei.';
          this.notify(message, 'error');
        }
      });
    }
  }

  editReview(review: Review) {
    this.dialog.open<AddReviewDialogComponent, AddReviewDialogData, AddReviewDialogResult>(
      AddReviewDialogComponent,
      {
        width: '400px',
        data: {
          productId: review.productId,
          userId: review.userId,
          reviewId: review.id,
          initialRating: review.stars,
          initialComment: review.body
        }
      }
    );
  }

  deleteReview(id: number) {
    if (!confirm('Sigur vrei să ștergi această recenzie?')) return;
    this.store.dispatch(deleteReviewAction({ id }));
  }
}
