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

  // products = [
  //   { id: 1, name: 'Extract floral I', price: 59, imageUrl: 'assets/images/stejar-copac-terrabucovina.jpg', isAddedToFav: false },
  //   { id: 2, name: 'Extract floral II', price: 62, imageUrl: 'assets/images/stejar-copac-terrabucovina.jpg', isAddedToFav: false },
  //   { id: 3, name: 'Ceai relaxant', price: 28, imageUrl: 'assets/images/stejar-copac-terrabucovina.jpg', isAddedToFav: false },
  //   { id: 4, name: 'Ulei esențial', price: 79, imageUrl: 'assets/images/stejar-copac-terrabucovina.jpg', isAddedToFav: false },
  //   { id: 5, name: 'Balsam natural', price: 44, imageUrl: 'assets/images/stejar-copac-terrabucovina.jpg', isAddedToFav: false },
  //   { id: 6, name: 'Ceai relaxant', price: 28, imageUrl: 'assets/images/stejar-copac-terrabucovina.jpg', isAddedToFav: false },
  //   { id: 7, name: 'Ulei esențial', price: 79, imageUrl: 'assets/images/stejar-copac-terrabucovina.jpg', isAddedToFav: false },
  //   { id: 8, name: 'Balsam natural', price: 44, imageUrl: 'assets/images/stejar-copac-terrabucovina.jpg', isAddedToFav: false },
  // ] as unknown as Product[];

  scrollRow(dir: 'left' | 'right') {
    const el = this.scrollArea.nativeElement;
    const step = 260;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  }


}
