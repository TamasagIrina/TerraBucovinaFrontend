import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);


export const addProduct = createAction(
  '[Products] Add Product',
  props<{ product: Omit<Product, 'id'> }>()   // id vine de la backend
);

export const addProductSuccess = createAction(
  '[Products] Add Product Success',
  props<{ product: Product }>()               // cu id populat
);

export const addProductFailure = createAction(
  '[Products] Add Product Failure',
  props<{ error: any }>()
);


export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ product: Product }>()               // include id
);

export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  '[Products] Update Product Failure',
  props<{ error: any }>()
);


export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ productId: number }>()
);

export const deleteProductFailure = createAction(
  '[Products] Delete Product Failure',
  props<{ error: any }>()
);

export const ProductsActions = {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  addProduct,
  addProductSuccess,
  addProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure
};