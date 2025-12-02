import { createAction, props } from '@ngrx/store';
import { Category } from '../../interfaces/category.interface';

// LOAD ALL
export const loadCategories = createAction('[Categories] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: any }>()
);

// ADD CATEGORY
export const addCategory = createAction(
  '[Categories] Add Category',
  props<{ category: Omit<Category, 'id'> }>()
);

export const addCategorySuccess = createAction(
  '[Categories] Add Category Success',
  props<{ category: Category }>()
);

export const addCategoryFailure = createAction(
  '[Categories] Add Category Failure',
  props<{ error: any }>()
);

export const CategoriesActions = {
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  addCategory,
  addCategorySuccess,
  addCategoryFailure
};
