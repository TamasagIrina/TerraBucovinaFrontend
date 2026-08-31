import { T } from '@angular/cdk/keycodes';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { ProductResponse } from '../../core/interfaces/product.interface';
import { decodeJwt, getExpDate, isExpired, timeLeftMs } from '../../core/services/authService/jwt.utils';
import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/store/products/products.actions';
import { Observable } from 'rxjs';
import { selectAllProducts, selectAllProductsWithPrimaryImage, selectProductsByCategory } from '../../core/store/products/products.selectors';
import { selectAllImages } from '../../core/store/images/images.selectors';
import { ImagesActions } from '../../core/store/images/images.actions';
import { Category } from '../../core/interfaces/category.interface';
import { selectAllCategories } from '../../core/store/categoris/category.selectors';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth-sevices.service';


@Component({
  selector: 'app-shop',
  imports: [
    MatIconModule,
    CommonModule,
    ProductCardComponent,
    AsyncPipe
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {  
  categories$!: Observable<Category[]>;
  products$!: Observable<ProductResponse[]>;
  loading$: any;
  error$: any;

  constructor(public store: Store, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {

    this.products$ = this.store.select(selectAllProductsWithPrimaryImage);
    this.categories$ = this.store.select(selectAllCategories);

    // Re-fetch including inactive products for admins who logged in without a
    // full page reload (app.component.ts's bootstrap fetch only knows the
    // auth state at initial load).
    if (this.authService.isLoggedIn() && this.authService.hasRole('ROLE_ADMIN')) {
      this.store.dispatch(ProductsActions.loadProducts({ includeInactive: true }));
    }

  }

  openedCategories: number[] = [];

toggleCategory(catId: number) {
  if (this.openedCategories.includes(catId)) {
    this.openedCategories = this.openedCategories.filter(id => id !== catId);
  } else {
    this.openedCategories.push(catId);
  }
}

productsByCategory(catId: number): Observable<ProductResponse[]> {
  return this.store.select(selectProductsByCategory(catId));
}

goToProduct(id: number) {
  this.router.navigate(['details', id]);
}


}
