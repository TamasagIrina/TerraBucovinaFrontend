import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from '../../services/api-service/api.service';

@Injectable()

export class ProductsEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService)

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.apiService.getProducts().pipe(
          map(products => ProductsActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductsActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.addProduct),
      mergeMap(({ product }) =>
        this.apiService.createProducts(product).pipe(
          map(created => ProductsActions.addProductSuccess({ product: created })),
          catchError(error => of(ProductsActions.addProductFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      mergeMap(({ product }) =>
        this.apiService.updateProducts(product.id, product).pipe(
          map(updated => ProductsActions.updateProductSuccess({ product: updated })),
          catchError(error => of(ProductsActions.updateProductFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      mergeMap(({ productId }) =>
        this.apiService.deleteProducts(productId).pipe(
          map(() => ProductsActions.deleteProductSuccess({ productId })),
          catchError(error => of(ProductsActions.deleteProductFailure({ error })))
        )
      )
    )
  );


}
