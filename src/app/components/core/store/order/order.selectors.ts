import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';
import { orderFeatureKey } from './order.reducer';


export const selectOrderState = createFeatureSelector<OrderState>(orderFeatureKey);


export const selectAllOrders = createSelector(
  selectOrderState,
  (state) => state.orders
);

export const selectCustomerOrders = createSelector(
  selectOrderState,
  (state) => state.orders
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state) => state.loading
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state) => state.error
);

export const selectOrderMessage = createSelector(
  selectOrderState,
  (state) => state?.message
);
