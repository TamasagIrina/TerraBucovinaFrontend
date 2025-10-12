import { createAction, props } from '@ngrx/store';
import { Plant } from '../../interfaces/plant.interfece';

export const loadPlants = createAction('[Plants] Load Plants');
export const loadPlantsSuccess = createAction(
  '[Plants] Load Plants Success',
  props<{ plants: Plant[] }>()
);
export const loadPlantsFailure = createAction(
  '[Plants] Load Plants Failure',
  props<{ error: any }>()
);


export const loadPlantById = createAction(
  '[Plants] Load Plant By Id',
  props<{ id: number }>()
);
export const loadPlantByIdSuccess = createAction(
  '[Plants] Load Plant By Id Success',
  props<{ plant: Plant }>()
);
export const loadPlantByIdFailure = createAction(
  '[Plants] Load Plant By Id Failure',
  props<{ error: any }>()
);

export const loadPlantsByProduct = createAction(
  '[Plants] Load Plants By Product',
  props<{ productId: number }>()
);
export const loadPlantsByProductSuccess = createAction(
  '[Plants] Load Plants By Product Success',
  props<{ productId: number; plants: Plant[] }>()
);
export const loadPlantsByProductFailure = createAction(
  '[Plants] Load Plants By Product Failure',
  props<{ productId: number; error: any }>()
);


export const addPlant = createAction(
  '[Plants] Add Plant',
  props<{ plant: Omit<Plant, 'id'> }>() 
);
export const addPlantSuccess = createAction(
  '[Plants] Add Plant Success',
  props<{ plant: Plant }>()
);
export const addPlantFailure = createAction(
  '[Plants] Add Plant Failure',
  props<{ error: any }>()
);


export const updatePlant = createAction(
  '[Plants] Update Plant',
  props<{ plant: Plant }>()
);
export const updatePlantSuccess = createAction(
  '[Plants] Update Plant Success',
  props<{ plant: Plant }>()
);
export const updatePlantFailure = createAction(
  '[Plants] Update Plant Failure',
  props<{ error: any }>()
);


export const deletePlant = createAction(
  '[Plants] Delete Plant',
  props<{ id: number }>()
);
export const deletePlantSuccess = createAction(
  '[Plants] Delete Plant Success',
  props<{ id: number }>()
);
export const deletePlantFailure = createAction(
  '[Plants] Delete Plant Failure',
  props<{ error: any }>()
);
