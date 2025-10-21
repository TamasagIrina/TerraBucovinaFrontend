import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItemDetailed } from '../../core/interfaces/cart.interface';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../core/store/cart/cart.selectors';
import * as CartActions from '../../core/store/cart/cart.actions';
@Component({
  selector: 'app-cart',
  imports: [ RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItem$!: Observable<CartItemDetailed[]>;
  totalPrice$!: Observable<number>;

  constructor(private store : Store){}

  ogOnInif(){
     this.cartItem$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
  }

  increase(productId : number){
    this.store.dispatch(CartActions.increaseQuanity({productId}))
  }

   decrease(productId : number){
    this.store.dispatch(CartActions.descreaseQuanity({productId}))
  }

    remove(productId : number){
    this.store.dispatch(CartActions.removeItem({productId}))
  }


  clearCart(){
    if(confirm('Are you sure you want to clear the entire CART ??')){
      this.store.dispatch(CartActions.clearCart());
    }
  }
}
