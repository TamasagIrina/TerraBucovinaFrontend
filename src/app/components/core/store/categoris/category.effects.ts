import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoriesActions from './category.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from '../../services/api-service/api.service';

@Injectable()
export class CategoriesEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      mergeMap(() =>
        this.apiService.getCategories().pipe(
          map(categories => CategoriesActions.loadCategoriesSuccess({ categories })),
          catchError(error => of(CategoriesActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.addCategory),
      mergeMap(({ category }) =>
        this.apiService.addCategory(category).pipe(
          map(created => CategoriesActions.addCategorySuccess({ category: created })),
          catchError(error => of(CategoriesActions.addCategoryFailure({ error })))
        )
      )
    )
  );
}
