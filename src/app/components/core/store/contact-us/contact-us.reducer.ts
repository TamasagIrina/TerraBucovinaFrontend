import { createReducer, on } from '@ngrx/store';
import * as ContactUsActions from './contact-us.actions';
import { ContactUsMessage } from '../../interfaces/contact-us-message.model';
import {  MessageStatus } from '../../interfaces/message-status.enum';

export const contactUsFeatureKey = 'contactUs';

export interface ContactUsState {
  messages: ContactUsMessage[];
  loading: boolean;
  error: string | null;
}

export const initialContactUsState: ContactUsState = {
  messages: [],
  loading: false,
  error: null
};

export const contactUsReducer = createReducer(
  initialContactUsState,

  // Load
  on(ContactUsActions.loadMessages, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ContactUsActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    loading: false,
    messages: [...messages]
  })),
  on(ContactUsActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add
  on(ContactUsActions.addMessage, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ContactUsActions.addMessageSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    messages: [...state.messages, message]
  })),
  on(ContactUsActions.addMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Status
  on(ContactUsActions.updateStatus, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ContactUsActions.updateStatusSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    messages: state.messages.map(m =>
      m.id === message.id ? message : m
    )
  })),
  on(ContactUsActions.updateStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);