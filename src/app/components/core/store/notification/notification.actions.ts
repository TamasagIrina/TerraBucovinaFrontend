import { createAction, props } from '@ngrx/store';

export const showNotification = createAction(
  '[Notification] Show Notification',
  props<{ message: string; notificationType: 'success' | 'error' | 'info' | 'warning' }>()
);

export const hideNotification = createAction('[Notification] Hide Notification');
