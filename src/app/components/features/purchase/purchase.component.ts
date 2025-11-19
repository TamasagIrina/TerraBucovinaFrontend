import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { CartItemDetailed } from '../../core/interfaces/cart.interface';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../core/store/cart/cart.selectors';

import * as OrderActions from '../../core/store/order/order.actions';
import { OrderProduct } from '../../core/interfaces/orederProduct.interface';
import { Order } from '../../core/interfaces/order.interface';
import { selectAllProducts, selectProductById } from '../../core/store/products/products.selectors';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { ApiService } from '../../core/services/api-service/api.service';
import { tick } from '@angular/core/testing';
import { User } from '../../core/interfaces/user.interface';
import { U } from '@angular/cdk/keycodes';
import { OrderEffects } from '../../core/store/order/order.effects';

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
  user: User | null = null;
  termsAccepted: any;



  constructor(private store: Store, protected router: Router, private authService: AuthService) { }



  ngOnInit() {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
    this.authService.getUserId().subscribe(userId => {
      this.userId = userId as number;
      console.log(userId);
      this.authService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        console.log(user);
      });
    });



  }

  tab: 'card' | 'cod' | 'bank' = 'card';

  shippingMethod: 'curier' | 'pickup' = 'curier';

  submitOrder(form: NgForm, items: CartItemDetailed[]) {

    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    this.store.select(selectAllProducts).pipe(take(1)).subscribe(allProducts => {
      const products: OrderProduct[] = items.map(item => ({
        product: allProducts.find(p => p.id === item.productId)!,
        quantity: item.quantity
      }));
      const orderUser: User | null = this.user ? {
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        password: null,
        roles: null,
        enabled: null,
        orders: null
      } : null;

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
        user: orderUser,
        status: null,
        createdAt: null
      };

      this.store.dispatch(OrderActions.addOrder({ order }));
    });


  }

  setTab(next: 'card' | 'cod' | 'bank') {
    this.tab = next;
  }
}
