import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from './category.reducer';

export const selectCategoriesState =
  createFeatureSelector<CategoriesState>('categories');

export const selectAllCategories = createSelector(
  selectCategoriesState,
  (state) => state.categories
);

export const selectCategoriesLoading = createSelector(
  selectCategoriesState,
  (state) => state.loading
);

export const selectCategoriesError = createSelector(
  selectCategoriesState,
  (state) => state.error
);

export const selectCategoryAddSuccess = createSelector(
  selectCategoriesState,
  state => state.addSuccess
);
