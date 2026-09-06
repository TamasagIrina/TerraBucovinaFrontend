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
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAllProducts, selectAllProductsWithPrimaryImage, selectProductsByCategory } from '../../core/store/products/products.selectors';
import { selectAllImages } from '../../core/store/images/images.selectors';
import { ImagesActions } from '../../core/store/images/images.actions';
import { Category } from '../../core/interfaces/category.interface';
import { selectAllCategories } from '../../core/store/categoris/category.selectors';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { FormsModule } from '@angular/forms';

export type ProductSortOption = 'default' | 'price-asc' | 'price-desc' | 'popularity';

export interface ShopFilter {
  categoryId: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: ProductSortOption;
}

@Component({
  selector: 'app-shop',
  imports: [
    MatIconModule,
    CommonModule,
    ProductCardComponent,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  categories$!: Observable<Category[]>;
  products$!: Observable<ProductResponse[]>;
  filteredProducts$!: Observable<ProductResponse[]>;
  loading$: any;
  error$: any;

  readonly defaultFilter: ShopFilter = { categoryId: null, minPrice: null, maxPrice: null, sortBy: 'default' };
  private filterSubject = new BehaviorSubject<ShopFilter>({ ...this.defaultFilter });
  filter: ShopFilter = { ...this.defaultFilter };
  filterPanelOpen = false;
  activeFilterCount = 0;

  constructor(public store: Store, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {

    this.products$ = this.store.select(selectAllProductsWithPrimaryImage);
    this.categories$ = this.store.select(selectAllCategories);

    this.filteredProducts$ = combineLatest([this.products$, this.filterSubject]).pipe(
      map(([products, filter]) => this.applyFilter(products, filter))
    );

    // Re-fetch including inactive products for admins who logged in without a
    // full page reload (app.component.ts's bootstrap fetch only knows the
    // auth state at initial load).
    if (this.authService.isLoggedIn() && this.authService.hasRole('ROLE_ADMIN')) {
      this.store.dispatch(ProductsActions.loadProducts({ includeInactive: true }));
    }

  }

  private applyFilter(products: ProductResponse[], filter: ShopFilter): ProductResponse[] {
    let result = products;

    if (filter.categoryId != null) {
      result = result.filter(p => p.categoryId === filter.categoryId);
    }
    if (filter.minPrice != null) {
      result = result.filter(p => p.price >= filter.minPrice!);
    }
    if (filter.maxPrice != null) {
      result = result.filter(p => p.price <= filter.maxPrice!);
    }

    switch (filter.sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        result = [...result].sort((a, b) => (b.reviews?.length ?? 0) - (a.reviews?.length ?? 0));
        break;
    }

    return result;
  }

  toggleFilterPanel() {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  private countActiveFilters(filter: ShopFilter): number {
    let count = 0;
    if (filter.categoryId != null) count++;
    if (filter.minPrice != null) count++;
    if (filter.maxPrice != null) count++;
    if (filter.sortBy !== 'default') count++;
    return count;
  }

  /** Applies the filter form's current values and closes the panel back to just the "Filtru" button. */
  applyFilters() {
    this.activeFilterCount = this.countActiveFilters(this.filter);
    this.filterSubject.next({ ...this.filter });
    this.filterPanelOpen = false;
  }

  resetFilter() {
    this.filter = { ...this.defaultFilter };
    this.activeFilterCount = 0;
    this.filterSubject.next({ ...this.filter });
    this.filterPanelOpen = false;
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
