import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCart from './cart.reducer';
import * as fromProducts from '../products/products.selectors'
import { CartItemDetailed } from '../../interfaces/cart.interface';


export const selectCartState = createFeatureSelector<fromCart.CartState>(fromCart.cartFeatureKey);


export const selectCartItems = createSelector(
  selectCartState,
  (state : fromCart.CartState) => state.items
);

export const selectCartTotalItems = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);


export const selectCartItemsWithDetails = createSelector(
  selectCartItems,
  fromProducts.selectAllProductsWithPrimaryImage,
  (items, products) : CartItemDetailed[] => {
    if(!products || products.length == 0 ){
      return [];
    }
    return items.map(item => {
      const product = products.find(p => p.id === item.productId);
      const price = product?.price ?? 0;
      const lineTotal = item.quantity * price;
      return {
        ...item,
        name : product?.name ?? 'Product not found',
        price  : price,
        imageUrl : product?.mainImageUrl ?? 'Image not found',
        lineTotal : lineTotal
      };
    })
  }
);

export const selectCartTotalPrice = createSelector(
selectCartItemsWithDetails,
(detailedItem) => detailedItem.reduce((total, item) => total + item.lineTotal, 0)
);







