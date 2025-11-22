import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ContactUsEffects } from '../../core/store/contact-us/contact-us.effects';
import { ContactUsMessage } from '../../core/interfaces/contact-us-message.model';
import { selectAllMessages } from '../../core/store/contact-us/contact-us.selectors';
import { loadMessages } from '../../core/store/contact-us/contact-us.actions';
import { MatDialog } from '@angular/material/dialog';
import { ReplyToMessageDialogComponent } from '../../shared/reply-to-message-dialog/reply-to-message-dialog.component';

@Component({
  selector: 'app-see-all-contact-us-messages',
  imports: [CommonModule],
  templateUrl: './see-all-contact-us-messages.component.html',
  styleUrl: './see-all-contact-us-messages.component.scss'
})
export class SeeAllContactUsMessagesComponent {

  messages$!: Observable<ContactUsMessage[]>;
  loading$!: Observable<boolean>;
  statusOptions = ['ÎN_ASTEPTARE', 'RASPUNS'];
  currentStatusTab = 'ÎN_ASTEPTARE';

  filteredMessages$!: Observable<ContactUsMessage[]>;
  constructor(private store: Store, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.store.dispatch(loadMessages())
    this.messages$ = this.store.select(selectAllMessages);
    this.applyTabFilter();
  }

  setCurrentTab(status: string) {
    this.currentStatusTab = status;
    this.applyTabFilter();
  }

  applyTabFilter() {
    this.filteredMessages$ = this.messages$.pipe(
      map(messages =>
        messages.filter(msg => msg.status === this.currentStatusTab)
      )
    );
  }

  replyTo(msg: ContactUsMessage) {
    const dialogRef = this.dialog.open(ReplyToMessageDialogComponent, {
      width: '800px',
      data: {
        id:msg.id,
        name: msg.name,
        email: msg.email,
        subject: msg.subject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call your email sending service here
        console.log("Sending email to:", result);
      }
    });
  }
}
