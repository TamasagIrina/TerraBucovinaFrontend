import { createAction, props } from '@ngrx/store';
import {Image} from '../../interfaces/image.interface'


export const loadImagesByProduct = createAction(
  '[Images] Load Images By Product',
  props<{ productId: number }>()
);

export const loadImagesByProductSuccess = createAction(
  '[Images] Load Images By Product Success',
  props<{ productId: number; images: Image[] }>()
);

export const loadImagesByProductFailure = createAction(
  '[Images] Load Images By Product Failure',
  props<{ productId: number; error: any }>()
);


export const uploadImage = createAction(
  '[Images] Upload Image',
  props<{
    productId: number;
    file: File;
    altText?: string | null;
    sortOrder?: number | null;
    isPrimary?: boolean | null;
  }>()
);

export const uploadImageSuccess = createAction(
  '[Images] Upload Image Success',
  props<{ image: Image }>()
);

export const uploadImageFailure = createAction(
  '[Images] Upload Image Failure',
  props<{ error: any }>()
);


export const deleteImage = createAction(
  '[Images] Delete Image',
  props<{ imageId: number }>()
);

export const deleteImageSuccess = createAction(
  '[Images] Delete Image Success',
  props<{ imageId: number }>()
);

export const deleteImageFailure = createAction(
  '[Images] Delete Image Failure',
  props<{ error: any }>()
);

export const ImagesActions = {
  loadImagesByProduct,
  loadImagesByProductSuccess,
  loadImagesByProductFailure,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure,
  deleteImage,
  deleteImageSuccess,
  deleteImageFailure
};
