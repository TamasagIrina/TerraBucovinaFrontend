import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItemDetailed } from '../../core/interfaces/cart.interface';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../core/store/cart/cart.selectors';
import * as CartActions from '../../core/store/cart/cart.actions';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-dropdown',
  imports: [RouterModule, 
    CommonModule,
    MatIconModule
  ],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.scss'
})
export class CartDropdownComponent {


  cartItem$!: Observable<CartItemDetailed[]>;
  totalPrice$!: Observable<number>;

  constructor(private close: NavbarComponent, private store: Store) { }


  ngOnInit() {
    this.cartItem$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
  }

  increase(productId: number) {
    this.store.dispatch(CartActions.increaseQuanity({ productId }))
  }

  decrease(productId: number) {
    this.store.dispatch(CartActions.descreaseQuanity({ productId }))
  }

  remove(productId: number) {
    this.store.dispatch(CartActions.removeItem({ productId }))
  }


  clearCart() {
    if (confirm('Are you sure you want to clear the entire CART ??')) {
      this.store.dispatch(CartActions.clearCart());
    }
  }

  closeCart() {
    this.close.closeCart()
  }
}
