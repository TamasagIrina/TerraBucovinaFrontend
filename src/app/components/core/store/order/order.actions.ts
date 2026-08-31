import { createAction, props } from '@ngrx/store';
import { Order, OrderResponse } from '../../interfaces/order.interface';

export const loadOrders = createAction('[Order] Load Orders');

export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ orders: OrderResponse[] }>()
);

export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: any }>()
);

export const loadOrdersByCustomer = createAction(
  '[Order] Load Orders By Customer',
  props<{ customerId: number }>()
);

export const loadOrdersByCustomerSuccess = createAction(
  '[Order] Load Orders By Customer Success',
  props<{ orders: OrderResponse[] }>()
);

export const loadOrdersByCustomerFailure = createAction(
  '[Order] Load Orders By Customer Failure',
  props<{ error: any }>()
);


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
  props<{ order: OrderResponse }>()
);

export const addOrderFailure = createAction(
  '[Order] Add Order Failure',
   props<{ error: any }>()
);

export const clearOrderMessage = createAction('[Order] Clear Order Message');
