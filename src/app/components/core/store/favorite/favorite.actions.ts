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

/** Drops any favorite items whose product no longer exists (e.g. leftover
 * ids from an older localStorage snapshot, after the product was deleted). */
export const pruneInvalidItems = createAction(
  '[favorite Page] prune invalid items',
  props<{ validProductIds: number[] }>()
);






