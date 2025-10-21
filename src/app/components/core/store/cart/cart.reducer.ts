import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../../interfaces/cart.interface";
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface CartState {
  items : CartItem[];
}

export const intiialState : CartState = {
  items : [],
}

export const cartReducer = createReducer(
  intiialState,

  on(CartActions.addItem, (state, {productId, quantity}) => {
    const existingItemIndex = state.items.findIndex(item => item.productId === productId);

    let updatedItems : CartItem[];

    if(existingItemIndex > -1){
      updatedItems = state.items.map((item, index) =>
      index === existingItemIndex
      ? {...item, quantity : item.quantity + 1}
      : item
    );
    }else{
      updatedItems = [...state.items, {productId, quantity : quantity}]
    }

    return {...state, items : updatedItems}

  }),

  on(CartActions.removeItem, (state, {productId}) => ({
    ...state,
    items : state.items.filter(item => item.productId !== productId)
  })),

  on(CartActions.increaseQuanity, (state, {productId}) => ({
    ...state,
    items : state.items.map(item =>
      item.productId === productId
      ? {...item, quantity : item.quantity + 1}
      : item
    ),
  })),

  on(CartActions.descreaseQuanity, (state, {productId}) => {

    const existingItem = state.items.find(item => item.productId === productId);


    if(existingItem && existingItem.quantity > 1){
    
      return {
        ...state,
        items : state.items.map(item =>
          item.productId === productId
          ? {...item, quantity : item.quantity -1}
          : item
        ),
      };
    }else{

      // quaniuty is 1 = //
      return {
        ...state,
        items : state.items.filter(item => item.productId !== productId),
      }
    }
  }),

  on(CartActions.clearCart, (state) => ({
    ...state,
    items : []
  }))

);