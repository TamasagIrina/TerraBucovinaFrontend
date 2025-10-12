import { createFeatureSelector, createSelector } from '@ngrx/store';
import { imagesFeatureKey, ImagesState } from './images.reducer';

export const selectImagesState =
  createFeatureSelector<ImagesState>(imagesFeatureKey);

export const selectImagesLoading = createSelector(
  selectImagesState,
  s => s.loading
);

export const selectImagesError = createSelector(
  selectImagesState,
  s => s.error
);

export const selectAllImages = createSelector(
  selectImagesState,
  s => s.images
);

export const selectImagesByProduct = (productId: number) =>
  createSelector(selectAllImages, imgs => imgs.filter(i => i.product_id === productId));

export const selectPrimaryImageByProduct = (productId: number) =>
  createSelector(selectImagesByProduct(productId), imgs => imgs.find(i => i.is_primary));
