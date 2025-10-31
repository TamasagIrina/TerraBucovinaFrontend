import { createAction, props } from '@ngrx/store';


export const addItem = createAction(
  '[favorite Page] Add Item ',
  props<{productId : number}>()
);

export const addToFavoriteSuccess = createAction(
  '[favorite Page] Add Item Success ',
  props<{productId : number}>()
);

export const removeItem = createAction(
  '[favorite Page] remove Item ',
  props<{productId : number}>()
);
export const removeFromFavoriteSuccess = createAction(
  '[favorite Page] remove Item Success',
  props<{productId : number}>()
);






