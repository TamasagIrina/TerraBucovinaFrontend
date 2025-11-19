import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContactUsMessage } from '../../core/interfaces/contact-us-message.model';
import { MessageStatus } from '../../core/interfaces/message-status.enum';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addMessage } from '../../core/store/contact-us/contact-us.actions';
import { CommonModule } from '@angular/common';
// import {selectMessageSuccess, selectMessageError} from '../../core/store/contact-us/contact-us.selectors';
@Component({
  selector: 'app-contact',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  model = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    policyAccepted: false
  };

  constructor(
    private store: Store
  ) {

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    const message: ContactUsMessage = {
      id: 0,
      name: this.model.name,
      email: this.model.email,
      phone_number: this.model.phone,
      subject: this.model.subject,
      message: this.model.message,
      status: MessageStatus.IN_ASTEPTARE
    };
    this.store.dispatch(addMessage({ message }));
    
    form.resetForm();

  }
}

