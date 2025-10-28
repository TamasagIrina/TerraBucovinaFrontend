import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { Order } from '../../interfaces/order.interface';

export const orderFeatureKey = 'orders';

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: any;
}

export const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null
};

export const orderReducer = createReducer(
  initialState,

  on(OrderActions.addOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrderActions.addOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    orders: [...state.orders, order]
  })),

  on(OrderActions.addOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
