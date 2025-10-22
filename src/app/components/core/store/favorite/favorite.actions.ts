import { createAction, props } from '@ngrx/store';


export const addItem = createAction(
  '[favorite Page] Add Item ',
  props<{productId : number}>()
);

export const removeItem = createAction(
  '[favorite Page] remove Item ',
  props<{productId : number}>()
);




