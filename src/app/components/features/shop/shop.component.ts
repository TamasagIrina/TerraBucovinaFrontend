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
import { selectAllProducts } from '../../core/store/products/products.selectors';


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

  @ViewChild('scrollArea', { static: false }) scrollArea!: ElementRef<HTMLDivElement>;

  products$!: Observable<Product[]> ;
  loading$: any;
  error$: any;

  constructor(public store: Store) {

  }

  ngOnInit() {
     this.store.dispatch(ProductsActions.loadProducts());
    this.products$= this.store.select(selectAllProducts);

  }


  scrollRow(dir: 'left' | 'right') {
    const el = this.scrollArea.nativeElement;
    const step = 260;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  }


}
