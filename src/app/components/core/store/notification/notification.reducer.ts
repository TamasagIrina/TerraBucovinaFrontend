import { createReducer, on } from '@ngrx/store';
import * as NotificationActions from './notification.actions';

export const notificationFeatureKey = 'notification';

export interface NotificationState {
  message: string | null;
  notificationType: 'success' | 'error' | 'info' | 'warning' | null;
  show: boolean;
}

export const initialState: NotificationState = {
  message: null,
  notificationType: null,
  show: false,
};

export const notificationReducer = createReducer(
  initialState,
  on(NotificationActions.showNotification, (state, { message, notificationType }) => ({
    ...state,
    message,
    notificationType,
    show: true,
  })),
  on(NotificationActions.hideNotification, () => initialState)
);
