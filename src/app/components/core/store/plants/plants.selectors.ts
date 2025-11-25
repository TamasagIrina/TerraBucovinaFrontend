import { createFeatureSelector, createSelector } from '@ngrx/store';
import { plantsFeatureKey, PlantsState } from './plants.reducer';

export const selectPlantsState = createFeatureSelector<PlantsState>(plantsFeatureKey);

export const selectAllPlants = createSelector(selectPlantsState, s => s.plants);
export const selectPlantsLoading = createSelector(selectPlantsState, s => s.loading);
export const selectPlantsError   = createSelector(selectPlantsState, s => s.error);

export const selectAddPlantSuccess= createSelector(
  selectPlantsState,
  (state: PlantsState) => state.addPlantSuccess
);

export const selectPlantById = (id: number) =>
  createSelector(selectAllPlants, plants => plants.find(p => p.id === id));

export const selectPlantsByProduct = (productId: number) =>
  createSelector(selectAllPlants, plants => plants.filter(p => p.product.id === productId));
