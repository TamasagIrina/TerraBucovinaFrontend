import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api-service/api.service';
import * as OrderActions from './order.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as CartAction from '../cart/cart.actions';
import * as NotificationActions from '../notification/notification.actions';
@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);
  private router = inject(Router);


  loadOrders$ = createEffect(() =>
  this.actions$.pipe(
    ofType(OrderActions.loadOrders),
    mergeMap(() =>
      this.apiService.getAllOrders().pipe(
        map((orders) => OrderActions.loadOrdersSuccess({ orders })),
        catchError((error) =>
          of(OrderActions.loadOrdersFailure({ error }))
        )
      )
    )
  )
);

updateOrderStatus$ = createEffect(() =>
  this.actions$.pipe(
    ofType(OrderActions.updateOrderStatus),
    mergeMap(({ orderId, status }) =>
      this.apiService.updateOrderStatus(orderId, status).pipe(
        map((response) =>
          OrderActions.updateOrderStatusSuccess({
            orderId,
            status,
            message: response.message ?? 'Status actualizat cu succes!'
          })
        ),
        catchError((error) =>
          of(OrderActions.updateOrderStatusFailure({
            error,
            message: 'Eroare la actualizarea statusului'
          }))
        )
      )
    )
  )
);


  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.addOrder),
      mergeMap(({ order }) =>
        this.apiService.addOrder(order).pipe(
          map((response) =>
            OrderActions.addOrderSuccess({ order, message: response.message })
          ),
          catchError((error) =>
            of(OrderActions.addOrderFailure({ error, message: 'Order failed!' }))
          )
        )
      )
    )
  );

  addOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.addOrderSuccess),
        tap(() => {

          this.store.dispatch(
            NotificationActions.showNotification({
              message: 'Comanda a fost trimisă cu succes, o sa primiti mail de confirmare!',
              notificationType: 'success',
            })
          );

          setTimeout(() => {
            this.store.dispatch(NotificationActions.hideNotification());
          }, 5000);

          this.store.dispatch(CartAction.clearCart());

          this.router.navigateByUrl("/shop");
        })
      ),
    { dispatch: false }
  );



}
