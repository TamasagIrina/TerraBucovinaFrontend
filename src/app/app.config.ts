import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling } from '@angular/router';
import * as fromProducts from '../app/components/core/store/products/products.reducer';
import * as fromPlants from '../app/components/core/store/plants/plants.reducer';
import * as fromImages from '../app/components/core/store/images/images.reducer';
import * as fromOrders from '../app/components/core/store/order/order.reducer';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './components/core/services/token-interceptor/token-interceptor';
import { ProductsEffects } from './components/core/store/products/products.effects';
import { provideEffects } from '@ngrx/effects';
import { ActionReducer, provideState, provideStore } from '@ngrx/store';
import { PlantsEffects } from './components/core/store/plants/plants.effects';
import { ImagesEffects } from './components/core/store/images/images.effects';
import * as fromCart from '../app/components/core/store/cart/cart.reducer';
import * as fromFavorite from '../app/components/core/store/favorite/favorite.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { productsReducer } from '../app/components/core/store/products/products.reducer';
import { OrderEffects } from './components/core/store/order/order.effects';
import * as fromNotification from './components/core/store/notification/notification.reducer';
import { CartEffects } from './components/core/store/cart/cart.effects';
import { FavoriteEffects } from './components/core/store/favorite/favorite.effects';
import { ReviewEffects } from './components/core/store/review/review.effects';
import * as fromReview from './components/core/store/review/review.reducer';
import * as fromCategoris from './components/core/store/categoris/category.reducer';
import * as fromContactUs from './components/core/store/contact-us/contact-us.reducer';
import { ContactUsEffects } from './components/core/store/contact-us/contact-us.effects';
import { CategoriesEffects } from './components/core/store/categoris/category.effects';

const keysToSync = [
  fromCart.cartFeatureKey,
  fromFavorite.favoriteFeatureKey

];

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: keysToSync,
    rehydrate: true,
    storage: window.localStorage,
    removeOnUndefined: true,
  })(reducer)
}

const metaReducers = [localStorageSyncReducer]

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideStore(),
  provideHttpClient(withInterceptors([tokenInterceptor])),
  provideStore({ products: productsReducer }, { metaReducers }),
  // provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  provideEffects([
    ProductsEffects,
    PlantsEffects,
    ImagesEffects,
    OrderEffects,
    CartEffects,
    FavoriteEffects,
    ReviewEffects,
    ContactUsEffects,
    CategoriesEffects
  ]),
  provideRouter(
    routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'top',
    })
  ),
  provideState(fromNotification.notificationFeatureKey, fromNotification.notificationReducer),
  provideState(fromProducts.productFeatureKey, fromProducts.productsReducer),
  provideState(fromPlants.plantsFeatureKey, fromPlants.plantsReducer),
  provideState(fromImages.imagesFeatureKey, fromImages.imagesReducer),
  provideState(fromOrders.orderFeatureKey, fromOrders.orderReducer),
  provideState(fromCart.cartFeatureKey, fromCart.cartReducer),
  provideState(fromFavorite.favoriteFeatureKey, fromFavorite.favoriteReducer),
  provideState(fromReview.reviewFeatureKey, fromReview.reviewReducer),
  provideState(fromCategoris.categoriesFeatureKey, fromCategoris.categoriesReducer),
  provideState(fromContactUs.contactUsFeatureKey, fromContactUs.contactUsReducer)
  ]
};


