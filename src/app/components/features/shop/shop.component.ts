import { T } from '@angular/cdk/keycodes';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { Product } from '../../core/interfaces/product.interface';
import { decodeJwt, getExpDate, isExpired, timeLeftMs } from '../../core/services/authService/jwt.utils';
import { Store } from '@ngrx/store';

import { ProductsActions } from '../../core/store/products/products.actions';
import { Observable } from 'rxjs';
import { selectAllProducts, selectAllProductsWithPrimaryImage } from '../../core/store/products/products.selectors';
import { selectAllImages } from '../../core/store/images/images.selectors';
import { ImagesActions } from '../../core/store/images/images.actions';


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

  products$!: Observable<Product[]>;
  loading$: any;
  error$: any;

  constructor(public store: Store) {

  }

  ngOnInit() {
 
    this.products$ = this.store.select(selectAllProductsWithPrimaryImage);

  }


}
