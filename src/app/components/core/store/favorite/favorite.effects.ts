import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FavoriteActions from './favorite.actions';
import * as NotificationActions from '../notification/notification.actions';

@Injectable()
export class FavoriteEffects {
  private store = inject(Store);
    private actions$ = inject(Actions); 

  addToFavoriteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoriteActions.addToFavoriteSuccess),
        tap(() => {
            console.log("aiciii");  
          this.store.dispatch(
            NotificationActions.showNotification({
              message: 'Produs adăugat la favorite!',
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

  removeFromFavoriteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoriteActions.removeFromFavoriteSuccess),
        tap(() => {
          this.store.dispatch(
            NotificationActions.showNotification({
              message: 'Produs eliminat din favorite!',
              notificationType: 'info',
            })
          );

          setTimeout(() => {
            this.store.dispatch(NotificationActions.hideNotification());
          }, 3000);
        })
      ),
    { dispatch: false }
  );


}
