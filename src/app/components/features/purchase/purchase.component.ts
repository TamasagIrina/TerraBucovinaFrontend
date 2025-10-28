import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItemDetailed } from '../../core/interfaces/cart.interface';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../core/store/cart/cart.selectors';
import * as OrderActions from '../../core/store/order/order.actions';
import { OrderProduct } from '../../core/interfaces/orederProduct.interface';
import { Order } from '../../core/interfaces/order.interface';
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

  fullName = '';
  email = '';
  phone = '';
  isCompanyInvoice = false;
  cui: string | null = null;
  country = 'România';
  county = '';
  city = '';
  postalCode = '';
  address = '';
  userId: number | null = null;
  constructor(private store: Store) { }

  ngOnInit() {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
  }

  tab: 'card' | 'cod' | 'bank' = 'card';

  shippingMethod: 'curier' | 'pickup' = 'curier';

 submitOrder(items: CartItemDetailed[]) {
    const products: OrderProduct[] = items.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    const order: Order = {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      isCompanyInvoice: this.isCompanyInvoice,
      cui: this.cui,
      country: this.country,
      county: this.county,
      city: this.city,
      postalCode: this.postalCode,
      address: this.address,
      deliveryMethod: this.shippingMethod,
      paymentMethod: this.tab,
      products,
      userId: null
    };

    this.store.dispatch(OrderActions.addOrder({ order }));
  }

  setTab(next: 'card' | 'cod' | 'bank') {
    this.tab = next;
  }
}
