import { createAction, props } from '@ngrx/store';
import { Order } from '../../interfaces/order.interface';

export const addOrder = createAction(
  '[Order] Add Order',
  props<{ order: Order }>()
);

export const addOrderSuccess = createAction(
  '[Order] Add Order Success',
  props<{ order: Order }>()
);

export const addOrderFailure = createAction(
  '[Order] Add Order Failure',
  props<{ error: any }>()
);
