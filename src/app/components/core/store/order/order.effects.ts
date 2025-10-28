import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api-service/api.service';
import * as OrderActions from './order.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class OrderEffects {
   private actions$ = inject(Actions);
  private apiService = inject(ApiService)

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.addOrder),
      mergeMap(({ order }) =>
        this.apiService.addOrder(order).pipe(
          map((newOrder) => OrderActions.addOrderSuccess({ order: newOrder })),
          catchError((error) => of(OrderActions.addOrderFailure({ error })))
        )
      )
    )
  );
}
