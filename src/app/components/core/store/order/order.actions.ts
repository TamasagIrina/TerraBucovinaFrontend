import { createAction, props } from '@ngrx/store';
import { Order } from '../../interfaces/order.interface';

export const loadOrders = createAction('[Order] Load Orders');

export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: any }>()
);

// === UPDATE ORDER STATUS ===
export const updateOrderStatus = createAction(
  '[Order] Update Order Status',
  props<{ orderId: number; status: string }>()
);

export const updateOrderStatusSuccess = createAction(
  '[Order] Update Order Status Success',
  props<{ orderId: number; status: string }>()
);

export const updateOrderStatusFailure = createAction(
  '[Order] Update Order Status Failure',
  props<{ error: any }>()
);

export const addOrder = createAction(
  '[Order] Add Order',
 props<{ order: Order}>()
);

export const addOrderSuccess = createAction(
  '[Order] Add Order Success',
  props<{ order: Order }>()
);

export const addOrderFailure = createAction(
  '[Order] Add Order Failure',
   props<{ error: any }>()
);

export const clearOrderMessage = createAction('[Order] Clear Order Message');
