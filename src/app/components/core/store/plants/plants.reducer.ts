import { createReducer, on } from '@ngrx/store';
import * as PlantsActions from './plants.actions';
import { Plant } from '../../interfaces/plant.interfece';

export const plantsFeatureKey = 'plants';

export interface PlantsState {
  plants: Plant[];
  loading: boolean;
  error: any;
  addPlantSuccess: boolean;
}

export const initialState: PlantsState = {
  plants: [],
  loading: false,
  error: null,
  addPlantSuccess: false
};

export const plantsReducer = createReducer(
  initialState,


  on(PlantsActions.loadPlants, (state) => ({ ...state, loading: true, error: null })),
  on(PlantsActions.loadPlantsSuccess, (state, { plants }) => ({ ...state, loading: false, plants })),
  on(PlantsActions.loadPlantsFailure, (state, { error }) => ({ ...state, loading: false, error })),


  on(PlantsActions.loadPlantById, (state) => ({ ...state, loading: true, error: null })),
  on(PlantsActions.loadPlantByIdSuccess, (state, { plant }) => {
    const exists = state.plants.some(p => p.id === plant.id);
    return {
      ...state,
      loading: false,
      plants: exists ? state.plants.map(p => (p.id === plant.id ? plant : p)) : [...state.plants, plant]
    };
  }),
  on(PlantsActions.loadPlantByIdFailure, (state, { error }) => ({ ...state, loading: false, error })),


  on(PlantsActions.loadPlantsByProduct, (state) => ({ ...state, loading: true, error: null })),
  on(PlantsActions.loadPlantsByProductSuccess, (state, { productId, plants }) => {
    const rest = state.plants.filter(p => p.product.id !== productId);
    return { ...state, loading: false, plants: [...rest, ...plants] };
  }),
  on(PlantsActions.loadPlantsByProductFailure, (state, { error }) => ({ ...state, loading: false, error })),


  on(PlantsActions.addPlant, (state) => ({ ...state, loading: true, error: null })),
  on(PlantsActions.addPlantSuccess, (state, { plant }) => ({
    ...state,
    loading: false,
    plants: [...state.plants, plant],
    addPlantSuccess: true
  })),
  on(PlantsActions.addPlantFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    addPlantSuccess: false
  })),


  on(PlantsActions.updatePlant, (state) => ({ ...state, loading: true, error: null })),
  on(PlantsActions.updatePlantSuccess, (state, { plant }) => ({
    ...state,
    loading: false,
    plants: state.plants.map(p => (p.id === plant.id ? { ...p, ...plant } : p))
  })),
  on(PlantsActions.updatePlantFailure, (state, { error }) => ({ ...state, loading: false, error })),


  on(PlantsActions.deletePlant, (state) => ({ ...state, loading: true, error: null })),
  on(PlantsActions.deletePlantSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    plants: state.plants.filter(p => p.id !== id)
  })),
  on(PlantsActions.deletePlantFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
