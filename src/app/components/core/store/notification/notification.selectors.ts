import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState } from './notification.reducer';

export const selectNotificationState =
  createFeatureSelector<NotificationState>('notification');

export const selectNotification = createSelector(
  selectNotificationState,
  (state) => ({
    message: state.message,
    notificationType: state.notificationType,
    show: state.show
  })
);
