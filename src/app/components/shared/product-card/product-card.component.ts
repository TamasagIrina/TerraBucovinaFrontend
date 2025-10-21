import { Component, Input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { Product } from '../../core/interfaces/product.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ImagesActions } from '../../core/store/images/images.actions';
import { selectAllImages, selectImagesByProduct, selectPrimaryImageByProduct } from '../../core/store/images/images.selectors';
import { Image } from '../../core/interfaces/image.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import * as CartActions from "../../core/store/cart/cart.actions"
@Component({
  selector: 'app-product-card',
  imports: [MatIconModule,
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  images$!: Observable<Image | undefined>;

  constructor(private router: Router, public store: Store) {

  }

  public environment = environment.apiUrl;

  ngOnInit() {

    if (this.product?.id) {
      this.store.dispatch(ImagesActions.loadImagesByProduct({ productId: this.product.id }));
      this.images$ = this.store.select(selectPrimaryImageByProduct(this.product.id));
    }

  }
  // addToFavorite(){
  //   this.product.isAddedToFav=!this.product.isAddedToFav;
  // }

   async addToCart() {
    this.store.dispatch(CartActions.addItem({ productId: this.product.id, quantity: 1 }));

  
    // this.notificationService.show(`Ați adăugat în coș ${this.quantity} porții ${this.product.name}`);
  }
  goToDetail() {
   this.router.navigateByUrl("details/"+ this.product.id)
  }
}
