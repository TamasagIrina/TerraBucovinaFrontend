import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromFavorite from "./favorite.reducer";
import * as fromProducts from '../products/products.selectors'
import { FavoriteItemDetailed } from "../../interfaces/favorite.interface";

export const selectFavoriteState = createFeatureSelector<fromFavorite.FavoriteState>(fromFavorite.favoriteFeatureKey);


export const selectCartItems = createSelector(
  selectFavoriteState,
  (state : fromFavorite.FavoriteState) => state.items
);

export const selectCartTotalItems = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + 1, 0)
);

export const selectIsFavorite = (productId: number) =>
  createSelector(
    selectFavoriteState,
    (state) => state.items.some(item => item.productId === productId)
  );

export const selectFavoriteItemsWithDetails = createSelector(
  selectCartItems,
  fromProducts.selectAllProductsWithPrimaryImage,
  (items, products) : FavoriteItemDetailed[] => {
    if(!products || products.length == 0 ){
      return [];
    }
    return items.map(item => {
      const product = products.find(p => p.id === item.productId);
   
      return {
        ...item,
        name : product?.name ?? 'Product not found',
        price  : product?.price ?? 0,
        imageUrl : product?.main_image_url ?? 'Image not found',
       
      };
    })
  }
);