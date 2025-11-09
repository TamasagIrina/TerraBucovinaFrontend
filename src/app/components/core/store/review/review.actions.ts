import { createAction, props } from '@ngrx/store';
import { Review } from '../../interfaces/review.inerface';


export const loadReviews = createAction('[Review] Load All');
export const loadReviewsSuccess = createAction(
    '[Review] Load All Success',
    props<{ reviews: Review[] }>()
);
export const loadReviewsFailure = createAction(
    '[Review] Load All Failure',
    props<{ error: any }>()
);


export const loadReviewsByProductId = createAction(
    '[Review] Load By Product',
    props<{ productId: number }>()
);
export const loadReviewsByProductIdSuccess = createAction(
    '[Review] Load By Product Success',
    props<{ reviews: Review[] }>()
);
export const loadReviewsByProductIdFailure = createAction(
    '[Review] Load By Product Failure',
    props<{ error: any }>()
);


export const addReview = createAction(
    '[Review] Add',
    props<{ review: Review }>()
);
export const addReviewSuccess = createAction(
    '[Review] Add Success',
    props<{ review: Review }>()
);
export const addReviewFailure = createAction(
    '[Review] Add Failure',
    props<{ error: any }>()
);
