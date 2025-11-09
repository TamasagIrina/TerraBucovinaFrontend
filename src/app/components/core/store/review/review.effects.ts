import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ReviewActions from './review.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from '../../services/api-service/api.service';

@Injectable()
export class ReviewEffects {
   private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.loadReviews),
      mergeMap(() =>
        this.apiService.getAllReviews().pipe(
          map(reviews => ReviewActions.loadReviewsSuccess({ reviews })),
          catchError(error => of(ReviewActions.loadReviewsFailure({ error })))
        )
      )
    )
  );

  loadByProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.loadReviewsByProductId),
      mergeMap(action =>
        this.apiService.getAllReviewsByProductId(action.productId).pipe(
          map(reviews => ReviewActions.loadReviewsByProductIdSuccess({ reviews })),
          catchError(error => of(ReviewActions.loadReviewsByProductIdFailure({ error })))
        )
      )
    )
  );

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.addReview),
      mergeMap(action =>
        this.apiService.addReview(action.review).pipe(
          map(review => ReviewActions.addReviewSuccess({ review })),
          catchError(error => of(ReviewActions.addReviewFailure({ error })))
        )
      )
    )
  );
}
