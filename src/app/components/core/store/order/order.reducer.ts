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
  on(OrderActions.addOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrderActions.addOrderSuccess, (state, { order, message }) => ({
    ...state,
    orders: [...state.orders, order],
    message,
    error: null,
    loading: false
  })),

  on(OrderActions.addOrderFailure, (state, { error, message }) => ({
    ...state,
    error,
    message,
    loading: false
  })),
  on(OrderActions.clearOrderMessage, (state) => ({
    ...state,
    message: null
  }))
);
