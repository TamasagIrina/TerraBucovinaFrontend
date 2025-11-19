import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContactUsActions from './contact-us.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ApiService } from '../../services/api-service/api.service';
import { Store } from '@ngrx/store';
import * as NotificationActions from '../notification/notification.actions';

@Injectable()
export class ContactUsEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService)
  private store = inject(Store);

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactUsActions.loadMessages),
      mergeMap(() =>
        this.apiService.getAllContactUsMessages().pipe(
          map(messages => ContactUsActions.loadMessagesSuccess({ messages })),
          catchError(error =>
            of(ContactUsActions.loadMessagesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactUsActions.addMessage),
      mergeMap(action =>
        this.apiService.addContactUsMessages(action.message).pipe(
          map(message => ContactUsActions.addMessageSuccess({ message })),
          catchError(error =>
            of(ContactUsActions.addMessageFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addMessageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ContactUsActions.addMessageSuccess),
        tap(() => {
          this.store.dispatch(
            NotificationActions.showNotification({
              message: 'Mesajul a fost trimis!',
              notificationType: 'success',
            })
          );

          setTimeout(() => {
            this.store.dispatch(NotificationActions.hideNotification());
          }, 3000);
        })
      ),
    { dispatch: false }
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactUsActions.updateStatus),
      mergeMap(action =>
        this.apiService.updateStatusContactUsMessages(action.id, action.status, action.responseMessage).pipe(
          map(message => ContactUsActions.updateStatusSuccess({ message })),
          catchError(error =>
            of(ContactUsActions.updateStatusFailure({ error: error.message }))
          )
        )
      )
    )
  );
}