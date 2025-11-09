import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';  // for star icons maybe
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    @Inject(MAT_DIALOG_DATA) public data: AddReviewDialogData
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
