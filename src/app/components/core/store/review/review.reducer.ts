import { createReducer, on } from '@ngrx/store';
import * as ReviewActions from './review.actions';
import { Review } from '../../interfaces/review.inerface';

export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: any;
}

export const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null
};

export const reviewReducer = createReducer(
  initialState,

  // Load all or by product
  on(ReviewActions.loadReviews, ReviewActions.loadReviewsByProductId, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ReviewActions.loadReviewsSuccess, ReviewActions.loadReviewsByProductIdSuccess, (state, { reviews }) => ({
    ...state,
    reviews,
    loading: false
  })),
  on(ReviewActions.loadReviewsFailure, ReviewActions.loadReviewsByProductIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add
  on(ReviewActions.addReview, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ReviewActions.addReviewSuccess, (state, { review }) => ({
    ...state,
    reviews: [...state.reviews, review],
    loading: false
  })),
  on(ReviewActions.addReviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
