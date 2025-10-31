import { createAction, props } from '@ngrx/store';


export const addItem = createAction(
  '[cart Page] Add Item ',
  props<{productId : number, quantity : number}>()
);

export const  addToCartSuccess = createAction(
  '[cart Page] Add Item Success ',
  props<{productId : number, quantity : number}>()
);
export const removeItem = createAction(
  '[cart Page] remove Item ',
  props<{productId : number}>()
);



export const removeFromCartSuccess = createAction(
  '[cart Page] remove Item Success',
  props<{productId : number}>()
);


export const increaseQuanity = createAction(
  '[cart Page] increase Item ',
  props<{productId : number}>()
);

export const descreaseQuanity = createAction(
  '[cart Page] decrease Item ',
  props<{productId : number}>()
);

export const clearCart = createAction(
  '[cart Page] remove all Items'
);


