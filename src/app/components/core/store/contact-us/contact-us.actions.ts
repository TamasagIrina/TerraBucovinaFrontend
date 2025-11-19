import { createAction, props } from '@ngrx/store';
import { ContactUsMessage } from '../../interfaces/contact-us-message.model';
import {  MessageStatus } from '../../interfaces/message-status.enum';

export const loadMessages = createAction(
  '[Contact Us] Load Messages'
);
export const loadMessagesSuccess = createAction(
  '[Contact Us] Load Messages Success',
  props<{ messages: ContactUsMessage[] }>()
);
export const loadMessagesFailure = createAction(
  '[Contact Us] Load Messages Failure',
  props<{ error: string }>()
);


export const addMessage = createAction(
  '[Contact Us] Add Message',
  props<{ message: ContactUsMessage }>()
);
export const addMessageSuccess = createAction(
  '[Contact Us] Add Message Success',
  props<{ message: ContactUsMessage }>()
);
export const addMessageFailure = createAction(
  '[Contact Us] Add Message Failure',
  props<{ error: string }>()
);


export const updateStatus = createAction(
  '[Contact Us] Update Status',
  props<{ id: number; status: MessageStatus; responseMessage?: string }>()
);
export const updateStatusSuccess = createAction(
  '[Contact Us] Update Status Success',
  props<{ message: ContactUsMessage }>()
);
export const updateStatusFailure = createAction(
  '[Contact Us] Update Status Failure',
  props<{ error: string }>()
);