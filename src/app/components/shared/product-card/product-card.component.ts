import { Component, Input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { ProductResponse } from '../../core/interfaces/product.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ImagesActions } from '../../core/store/images/images.actions';
import { selectAllImages, selectImagesByProduct, selectPrimaryImageByProduct } from '../../core/store/images/images.selectors';
import { Image } from '../../core/interfaces/image.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import * as CartActions from "../../core/store/cart/cart.actions"
import * as FavoriteActions from "../../core/store/favorite/favorite.actions"
import { tick } from '@angular/core/testing';
import * as FavoriteSelectors from '../../core/store/favorite/favorite.selectors';
import { CartEffects } from '../../core/store/cart/cart.effects';
import { ProductsActions } from '../../core/store/products/products.actions';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
@Component({
  selector: 'app-product-card',
  imports: [MatIconModule,
    CommonModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: ProductResponse;
  images$!: Observable<Image | undefined>;
  isFavorite$!: Observable<boolean>;

  constructor(private router: Router, public store: Store, private authService: AuthService) {
  }

  get isAdmin(): boolean {
    return this.authService.isLoggedIn() && this.authService.hasRole('ROLE_ADMIN');
  }

  onEdit(): void {
    this.router.navigate(['admin/edit-product', this.product.id]);
  }

  onDelete(): void {
    if (confirm(`Sigur doriți să dezactivați produsul „${this.product.name}"? Va dispărea din magazin, dar rămâne în istoricul comenzilor.`)) {
      // Marked inactive by the deleteProductSuccess reducer (soft delete), so
      // it stays visible here — just badged and swapped to a reactivate button.
      this.store.dispatch(ProductsActions.deleteProduct({ productId: this.product.id }));
    }
  }

  onReactivate(): void {
    this.store.dispatch(ProductsActions.reactivateProduct({ productId: this.product.id }));
  }

  ngOnInit() {
    this.isFavorite$ = this.store.select(
      FavoriteSelectors.selectIsFavorite(this.product.id)
    );
  }


  async addToCart() {
    this.store.dispatch(CartActions.addItem({ productId: this.product.id, quantity: 1 }));
    this.store.dispatch(CartActions.addToCartSuccess({ productId: this.product.id, quantity: 1 }));   
    this.store.dispatch(FavoriteActions.removeItem({ productId: this.product.id }));
   

  }
 

toggleFavorite(productId: number) {
  this.isFavorite$.pipe(take(1)).subscribe(isFav => {
    if (isFav) {
      this.store.dispatch(FavoriteActions.removeItem({ productId }));
       this.store.dispatch(FavoriteActions.removeFromFavoriteSuccess({ productId: this.product.id }));
    } else {
      this.store.dispatch(FavoriteActions.addItem({ productId }));
       this.store.dispatch(FavoriteActions.addToFavoriteSuccess({ productId: this.product.id }));
    }
  });
  
}
  goToDetail() {
    if (!this.product.active) return;
    this.router.navigateByUrl("details/" + this.product.id)
  }
}
