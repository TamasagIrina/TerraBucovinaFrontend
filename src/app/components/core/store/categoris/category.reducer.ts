import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './category.actions';
import { Category } from '../../interfaces/category.interface';

export const categoriesFeatureKey = 'categories';

export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: any;
    addSuccess: boolean;
}

export const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
    addSuccess: false,
};

export const categoriesReducer = createReducer(
    initialState,

    // LOAD
    on(CategoriesActions.loadCategories, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        loading: false,
        categories,
    })),

    on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // ADD
    on(CategoriesActions.addCategory, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(CategoriesActions.addCategorySuccess, (state, { category }) => ({
        ...state,
        loading: false,
        addSuccess: true,
        categories: [...state.categories, category],
    })),

    on(CategoriesActions.addCategoryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
