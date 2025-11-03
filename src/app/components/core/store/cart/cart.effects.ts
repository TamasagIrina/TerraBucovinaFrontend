import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CartActions from './cart.actions';
import { tap } from "rxjs";
import { Store } from "@ngrx/store";
import * as NotificationActions from '../notification/notification.actions';

@Injectable()
export class CartEffects {
    private actions$ = inject(Actions); 
    private store = inject(Store);
    
    addToCartSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CartActions.addToCartSuccess),
                tap(() => {
                    this.store.dispatch(
                        NotificationActions.showNotification({
                            message: 'Produs adăugat în coș!',
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

 removeFromCartSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.removeFromCartSuccess),
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


