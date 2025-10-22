import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoriteItemDetailed } from '../../core/interfaces/favorite.interface';
import * as FavoriteSelectors from "../../core/store/favorite/favorite.selectors";
import * as FavoriteActions from "../../core/store/favorite/favorite.actions";

import * as CartActions from "../../core/store/cart/cart.actions";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-favorite-dropdown',
  imports: [
    MatIconModule,
    CommonModule,

  ],
  templateUrl: './favorite-dropdown.component.html',
  styleUrl: './favorite-dropdown.component.scss'
})
export class FavoriteDropdownComponent {

  favoriteItems$!: Observable<FavoriteItemDetailed[]>;
  constructor(private close: NavbarComponent, private store: Store) { }

  ngOnInit() {
    this.favoriteItems$ = this.store.select(FavoriteSelectors.selectFavoriteItemsWithDetails);
  }

  closeFavorite() {
    this.close.closeFavorite()
  }

  remove(productId: number) {
    this.store.dispatch(FavoriteActions.removeItem({ productId }));
  }

  async addToCart(id: number) {
    this.store.dispatch(CartActions.addItem({ productId: id, quantity: 1 }));
    this.remove(id);

  }
}
