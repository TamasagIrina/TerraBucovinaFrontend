import { createReducer, on } from '@ngrx/store';
import * as ImagesActions from './images.actions';
import { Image } from '../../interfaces/image.interface';

export const imagesFeatureKey = 'images';

export interface ImagesState {
  images: Image[];        
  loading: boolean;
  error: any;
}

export const initialState: ImagesState = {
  images: [],
  loading: false,
  error: null
};

export const imagesReducer = createReducer(
  initialState,
on(ImagesActions.loadAllImages, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ImagesActions.loadAllImagesSuccess, (state, { images }) => ({
    ...state,
    loading: false,
    images
  })),
  on(ImagesActions.loadAllImagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
 
  on(ImagesActions.loadImagesByProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ImagesActions.loadImagesByProductSuccess, (state, { productId, images }) => {
   
    const rest = state.images.filter(img => img.productId !== productId);
    return {
      ...state,
      loading: false,
      images:[...rest, ...images]
    };
  }),
  on(ImagesActions.loadImagesByProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  
  on(ImagesActions.uploadImage, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ImagesActions.uploadImageSuccess, (state, { image }) => ({
    ...state,
    loading: false,
    images: [...state.images, image]
  })),
  on(ImagesActions.uploadImageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  
  on(ImagesActions.deleteImage, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ImagesActions.deleteImageSuccess, (state, { imageId }) => ({
    ...state,
    loading: false,
    images: state.images.filter(i => i.id !== imageId)
  })),
  on(ImagesActions.deleteImageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

);
