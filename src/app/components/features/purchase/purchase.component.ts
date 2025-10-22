import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItemDetailed } from '../../core/interfaces/cart.interface';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../core/store/cart/cart.selectors';
@Component({
  selector: 'app-purchase',
  imports: [RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {
  cartItems$!: Observable<CartItemDetailed[]>;
  totalPrice$!: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(){
       this.cartItems$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
      this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
    }

  tab: 'card' | 'cod' | 'bank' = 'card';

  shippingMethod: 'curier' | 'pickup' = 'curier';

  submitOrder() {
    console.log('Metoda aleasă:', this.shippingMethod);

  }

  setTab(next: 'card' | 'cod' | 'bank') {
    this.tab = next;
  }
}
