import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';  // for star icons maybe
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Review } from '../../core/interfaces/review.inerface';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { addReview, updateReview } from '../../core/store/review/review.actions';
export interface AddReviewDialogData {
  productId: number;
  userId: number;
  /** When set, the dialog edits this existing review instead of creating a new one. */
  reviewId?: number;
  initialRating?: number;
  initialComment?: string;

}

export interface AddReviewDialogResult {
  rating: number;
  comment: string;
}
@Component({
  selector: 'app-add-review-dialog',
  imports: [MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-review-dialog.component.html',
  styleUrl: './add-review-dialog.component.scss'
})
export class AddReviewDialogComponent {

  form: FormGroup;

  stars = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddReviewDialogComponent, AddReviewDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: AddReviewDialogData,
    private store: Store,
    private authApi: AuthService
  ) {
    this.form = this.fb.group({
      rating: [data.initialRating ?? null, [Validators.required]],
      comment: [data.initialComment ?? '', [Validators.required, Validators.minLength(5)]]
    });
  }

  get isEditMode(): boolean {
    return this.data.reviewId != null;
  }

  onStarClick(star: number) {
    this.form.get('rating')!.setValue(star);
  }

  submit() {
    if (this.form.valid) {
      const review: Review = {
        id: this.data.reviewId ?? 0,
        productId: this.data.productId,
        userId: this.data.userId,
        body: this.form.value.comment,
        stars: this.form.value.rating as number,
        createdAt: null
      };

      if (this.isEditMode) {
        this.store.dispatch(updateReview({ id: this.data.reviewId!, review }));
      } else {
        this.store.dispatch(addReview({ review }));
      }

      const result: AddReviewDialogResult = {
        rating: this.form.value.rating,
        comment: this.form.value.comment
      };
      this.dialogRef.close(result);
    }
  }

  cancel() {
    this.dialogRef.close(undefined);
  }
}
