import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as fromProducts from '../app/components/core/store/products/products.reducer';
import * as fromPlants from '../app/components/core/store/plants/plants.reducer';
import * as fromImages from '../app/components/core/store/images/images.reducer';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './components/core/services/token-interceptor/token-interceptor';
import { ProductsEffects } from './components/core/store/products/products.effects';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { PlantsEffects } from './components/core/store/plants/plants.effects';
import { ImagesEffects } from './components/core/store/images/images.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideStore(),
  provideHttpClient(withInterceptors([tokenInterceptor])),
  // provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
   provideEffects([
      ProductsEffects,
      PlantsEffects,
      ImagesEffects
    ]),
  provideState(fromProducts.productFeatureKey, fromProducts.productsReducer),
  provideState(fromPlants.plantsFeatureKey, fromPlants.plantsReducer),
  provideState(fromImages.imagesFeatureKey, fromImages.imagesReducer),
  ]
};


