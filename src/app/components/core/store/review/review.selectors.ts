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
