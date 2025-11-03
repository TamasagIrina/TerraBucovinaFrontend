import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { CartItemDetailed } from '../../core/interfaces/cart.interface';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../core/store/cart/cart.selectors';

import * as OrderActions from '../../core/store/order/order.actions';
import { OrderProduct } from '../../core/interfaces/orederProduct.interface';
import { Order } from '../../core/interfaces/order.interface';
import { selectAllProducts, selectProductById } from '../../core/store/products/products.selectors';

@Component({
  selector: 'app-purchase',
  imports: [RouterModule,
    CommonModule,
    FormsModule],
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



  constructor(private store: Store, protected router: Router) { }



  ngOnInit() {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);


  }

  tab: 'card' | 'cod' | 'bank' = 'card';

  shippingMethod: 'curier' | 'pickup' = 'curier';

  submitOrder(items: CartItemDetailed[]) {

    this.store.select(selectAllProducts).pipe(take(1)).subscribe(allProducts => {
      const products: OrderProduct[] = items.map(item => ({
        product: allProducts.find(p => p.id === item.productId)!,
        quantity: item.quantity
      }));
      const order: Order = {
        id: 0,
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
        userId: null,
        status: null,
        createdAt: null
      };

      console.log(order); 

      this.store.dispatch(OrderActions.addOrder({ order }));
    });


  }

  setTab(next: 'card' | 'cod' | 'bank') {
    this.tab = next;
  }
}
