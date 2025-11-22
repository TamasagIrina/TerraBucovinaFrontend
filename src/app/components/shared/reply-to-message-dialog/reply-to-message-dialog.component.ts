import { T } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { updateStatus } from '../../core/store/contact-us/contact-us.actions';
import { TitleStrategy } from '@angular/router';
import { MessageStatus } from '../../core/interfaces/message-status.enum';

export interface ReplyDialogData {
  id: number;
  name: string;
  email: string;
  subject: string;
}

@Component({
  selector: 'app-reply-to-message-dialog',
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './reply-to-message-dialog.component.html',
  styleUrl: './reply-to-message-dialog.component.scss'
})
export class ReplyToMessageDialogComponent {
  replyMessage = '';

  constructor(
    public dialogRef: MatDialogRef<ReplyToMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReplyDialogData,
    private store: Store
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(): void {
    if (this.replyMessage.trim()) {

      this.store.dispatch(updateStatus({
        id: this.data.id,
        status: MessageStatus.RASPUNS,
        responseMessage: this.replyMessage
      }));


      this.dialogRef.close({
        to: this.data.email,
        subject: this.data.subject,
        message: this.replyMessage
      });
    }
  }
}
