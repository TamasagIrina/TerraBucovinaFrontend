import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactUsState } from './contact-us.reducer';


export const selectContactUsState = createFeatureSelector<ContactUsState>('contactUs');

export const selectAllMessages = createSelector(
  selectContactUsState,
  (state: ContactUsState) => state.messages
);

export const selectLoading = createSelector(
  selectContactUsState,
  (state: ContactUsState) => state.loading
);

export const selectError = createSelector(
  selectContactUsState,
  (state: ContactUsState) => state.error
);