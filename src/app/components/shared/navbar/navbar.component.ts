import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CartDropdownComponent } from "../cart-dropdown/cart-dropdown.component";
import { CommonModule } from '@angular/common';
import { MatBadge } from '@angular/material/badge';
import { FavoriteDropdownComponent } from "../favorite-dropdown/favorite-dropdown.component";
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../core/store/cart/cart.selectors';
import * as FavoriteSelectors from '../../core/store/favorite/favorite.selectors';
import { Product } from '../../core/interfaces/product.interface';
import { selectAllProducts, selectAllProductsWithPrimaryImage } from '../../core/store/products/products.selectors';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from "../search-bar/search-bar.component";


@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    CartDropdownComponent,
    CommonModule,
    MatBadge,
    FavoriteDropdownComponent,
    FormsModule,
    SearchBarComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public isCartOpen = false;
  public isFavoriteOpen = false;
  totalCartItems$: Observable<number> | undefined;
  totalFavoriteItems$: Observable<number> | undefined;

  

  constructor(private store: Store) {
    this.totalCartItems$ = this.store.select(CartSelectors.selectCartTotalItems);
    this.totalFavoriteItems$ = this.store.select(FavoriteSelectors.selectCartTotalItems);
  }

 


  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    this.closeFavorite();

  }

  toggleFavorite() {
    this.isFavoriteOpen = !this.isFavoriteOpen;
    this.closeCart();

  }
  closeFavorite() {
    this.isFavoriteOpen = false;
  }

  closeCart() {
    this.isCartOpen = false;
  }


}
