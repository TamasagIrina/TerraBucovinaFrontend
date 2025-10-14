import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ImagesActions from './images.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from '../../services/api-service/api.service';

@Injectable()
export class ImagesEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImagesActions.loadImagesByProduct),
      mergeMap(({ productId }) =>
        this.apiService.getImageByProductId(productId).pipe(
          map(images => ImagesActions.loadImagesByProductSuccess({ productId, images })),
          catchError(error => of(ImagesActions.loadImagesByProductFailure({ productId, error })))
        )
      )
    )
  );

  upload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImagesActions.uploadImage),
      mergeMap(({ productId, file, altText, sortOrder, isPrimary }) =>
        this.apiService.uploadImage({ productId, file, altText, sortOrder, isPrimary } ).pipe(
          map(image => ImagesActions.uploadImageSuccess({ image })),
          catchError(error => of(ImagesActions.uploadImageFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImagesActions.deleteImage),
      mergeMap(({ imageId }) =>
        this.apiService.deleteImage(imageId).pipe(
          map(() => ImagesActions.deleteImageSuccess({ imageId })),
          catchError(error => of(ImagesActions.deleteImageFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService
  ) {}
}
