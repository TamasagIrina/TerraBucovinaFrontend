import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { Order } from '../../interfaces/order.interface';

export const orderFeatureKey = 'orders';

export interface OrderState {
  orders: Order[];
  message: string | null;
  error: any;
  loading: boolean;
}

export const initialState: OrderState = {
  orders: [],
  message: null,
  error: null,
  loading: false
};

export const orderReducer = createReducer(
  initialState,

  on(OrderActions.loadOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
  })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(OrderActions.loadOrdersByCustomer, (state, { customerId }) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrderActions.loadOrdersByCustomerSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false
  })),

  on(OrderActions.loadOrdersByCustomerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),


  on(OrderActions.updateOrderStatus, (state) => ({
    ...state,
    loading: true,
  })),
  on(OrderActions.updateOrderStatusSuccess, (state, { orderId, status }) => ({
    ...state,
    loading: false,
    orders: state.orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    ),
  })),
  on(OrderActions.updateOrderStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderActions.addOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrderActions.addOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],

    error: null,
    loading: false
  })),

  on(OrderActions.addOrderFailure, (state, { error }) => ({
    ...state,
    error,

    loading: false
  })),
  on(OrderActions.clearOrderMessage, (state) => ({
    ...state,
    message: null
  }))
);
