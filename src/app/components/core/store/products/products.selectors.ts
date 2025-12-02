import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productFeatureKey, ProductsState } from './products.reducer';
import { selectAllImages, selectPrimaryImageByProduct } from '../images/images.selectors';
import { environment } from '../../../../../environments/environment';

export const selectProductsState =
  createFeatureSelector<ProductsState>(productFeatureKey);

export const selectAllProducts = createSelector(
  selectProductsState,
  s => s.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  s => s.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  s => s.error
);

export const selectProductById = (id: number) =>
  createSelector(selectAllProducts, products => products.find(p => p.id === id));




export const selectAllProductsWithPrimaryImage = createSelector(
  selectAllProducts,
  selectAllImages,
  (products, images) => {
    if (!products || products.length === 0) {
      return [];
    }

    return products.map(product => {
      const primaryImage = images.find(img => {

        return img.productId === product.id && img.isPrimary;
      });


      return {
        ...product,
        mainImageUrl: primaryImage?.imageUrl ?  `${environment.apiUrl}${primaryImage?.imageUrl}` : 'https://placehold.co/60x40/cccccc/ffffff?text=Img'
      };
    });
  }
);

export const selectProductsByCategory = (categoryId: number) =>
  createSelector(
    selectAllProductsWithPrimaryImage,
    (products) => products.filter(p => p.categories?.id === categoryId)
  );