import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productFeatureKey, ProductsState } from './products.reducer';

export const selectProductsState =
  createFeatureSelector<ProductsState>(productFeatureKey);

export const selectAllProducts = createSelector(
  selectProductsState,
  s => s.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  s => s.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  s => s.error
);

export const selectProductById = (id: number) =>
  createSelector(selectAllProducts, products => products.find(p => p.id === id));
