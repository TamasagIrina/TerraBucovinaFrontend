import { createReducer, on } from "@ngrx/store";
import { FavoriteItem } from "../../interfaces/favorite.interface";
import * as FavoriteAction from "./favorite.actions"

export const favoriteFeatureKey = 'favorite';

export interface FavoriteState {
  items : FavoriteItem[];
}

export const initialState : FavoriteState = {
  items : [],
}

export const favoriteReducer = createReducer<FavoriteState>(
  initialState,

on(FavoriteAction.addItem, (state, { productId }) => {
  const alreadyExists = state.items.some(item => item.productId === productId);

  if (alreadyExists) {
    return state;
  }

  const updatedItems: FavoriteItem[] = [...state.items, { productId }];
  return { ...state, items: updatedItems };
}),


  on(FavoriteAction.removeItem, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.productId !== productId)
  }))
);