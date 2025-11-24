import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PlantsActions from './plants.actions';

import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from '../../services/api-service/api.service';

@Injectable()
export class PlantsEffects {

  private actions$ = inject(Actions);
  private service = inject(ApiService)

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlantsActions.loadPlants),
      mergeMap(() =>
        this.service.getAllPlants().pipe(
          map(plants => PlantsActions.loadPlantsSuccess({ plants })),
          catchError(error => of(PlantsActions.loadPlantsFailure({ error })))
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlantsActions.loadPlantById),
      mergeMap(({ id }) =>
        this.service.getPlantById(id).pipe(
          map(plant => PlantsActions.loadPlantByIdSuccess({ plant })),
          catchError(error => of(PlantsActions.loadPlantByIdFailure({ error })))
        )
      )
    )
  );

  loadByProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlantsActions.loadPlantsByProduct),
      mergeMap(({ productId }) =>
        this.service.getPlantByProductId(productId).pipe(
          map(plants => PlantsActions.loadPlantsByProductSuccess({ productId, plants })),
          catchError(error => of(PlantsActions.loadPlantsByProductFailure({ productId, error })))
        )
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlantsActions.addPlant),
      mergeMap(({ plant, file }) =>
        this.service.addPlant(plant, file).pipe(
          map(created => PlantsActions.addPlantSuccess({ plant: created })),
          catchError(error => of(PlantsActions.addPlantFailure({ error })))
        )
      )
    )
  );



  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlantsActions.deletePlant),
      mergeMap(({ id }) =>
        this.service.deletePlant(id).pipe(
          map(() => PlantsActions.deletePlantSuccess({ id })),
          catchError(error => of(PlantsActions.deletePlantFailure({ error })))
        )
      )
    )
  );


}
