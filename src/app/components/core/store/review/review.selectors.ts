import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewState } from './review.reducer';

export const selectReviewState = createFeatureSelector<ReviewState>('review');

export const selectAllReviews = createSelector(
  selectReviewState,
  (state) => state.reviews
);

export const selectLoading = createSelector(
  selectReviewState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectReviewState,
  (state) => state.error
);

export const selectByProductId = (productId: number) =>
  createSelector(
    selectAllReviews,
    (reviews) => reviews.filter(r => r.productId === productId)
  );

export const selectByProductIdCOUNT = (productId: number) =>
  createSelector(
    selectAllReviews,
    (reviews) => reviews.filter(r => r.productId === productId).length
  );

export const selectByProductIdMediaOfStars = (productId: number) =>
  createSelector(
    selectAllReviews,
    (reviews) => {
      const filtered = reviews.filter(r => r.productId === productId);
      if (filtered.length === 0) return 0;

      const sum = filtered.reduce((acc, item) => acc + item.stars, 0);
      return sum / filtered.length;
    }
  );


