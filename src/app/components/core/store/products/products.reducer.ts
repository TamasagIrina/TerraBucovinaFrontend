import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../../interfaces/product.interface';

export const productFeatureKey = 'products';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: any;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null
};

export const productsReducer = createReducer(
  initialState,

  // LOAD
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  // ADD
  on(ProductsActions.addProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.addProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product]
  })),
  on(ProductsActions.addProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // UPDATE
  on(ProductsActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map(p =>
      p.id === product.id ? { ...p, ...product } : p
    )
  })),
  on(ProductsActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // DELETE
  on(ProductsActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.deleteProductSuccess, (state, { productId }) => ({
    ...state,
    loading: false,
    products: state.products.filter(p => p.id !== productId)
  })),
  on(ProductsActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
