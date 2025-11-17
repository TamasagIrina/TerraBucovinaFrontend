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
import { Product } from '../../core/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { selectProductById } from '../../core/store/products/products.selectors';
import { combineLatest, forkJoin, take } from 'rxjs';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { addReview } from '../../core/store/review/review.actions';
import { User } from '../../core/interfaces/user.interface';
export interface AddReviewDialogData {
  productId: number;
  userId: number;

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
      rating: [null, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onStarClick(star: number) {
    this.form.get('rating')!.setValue(star);
  }

  submit() {
    if (this.form.valid) {
      var review: Review;
      // combineLatest([
      //   this.authApi.getUserById(this.data.userId),
      //   this.store.select(selectProductById(this.data.productId)).pipe(take(1))
      // ]).subscribe(([user, product]) => {
      //     review = {
      //     id: 0,
      //     product: product!,
      //     user: user!,
      //     body: this.form.value.comment,
      //     stars: this.form.value.rating as number
      //   };

      //   console.log(review);
      //   this.store.dispatch(addReview({ review }));
      // });
      var product: Product = {
        id: this.data.productId,
        name: '',
        price: 0,
        main_image_url: undefined,
        shortDesc: '',
        longDesc: '',
        category: '',
        stockQty: 0,
        createdAt: '',
        updatedAt: ''
      }

      var user: User = {
        id: this.data.userId,
        username: '',
        email: '',
        password: null,
        roles: null,
        enabled: null,
        orders: null
      }
      review = {
        id: 0,
        productId: this.data.productId ,   
        userId: this.data.userId ,
        body: this.form.value.comment,
        stars: this.form.value.rating as number
      };


      this.store.dispatch(addReview({ review }));

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
