import { Component, inject, Input, numberAttribute } from '@angular/core';

import { Product } from '../../core/interfaces/product.interface';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectProductById } from '../../core/store/products/products.selectors';
import { Observable, take } from 'rxjs';
import { Image } from '../../core/interfaces/image.interface';
import { ImagesActions } from '../../core/store/images/images.actions';
import { selectImagesByProduct } from '../../core/store/images/images.selectors';
import { environment } from '../../../../environments/environment';
import * as CartActions from "../../core/store/cart/cart.actions";
import * as FavoriteActions from "../../core/store/favorite/favorite.actions";
import * as FavoriteSelectors from '../../core/store/favorite/favorite.selectors';
import { ApiService } from '../../core/services/api-service/api.service';
import { T } from '@angular/cdk/keycodes';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { AddReviewDialogComponent, AddReviewDialogData, AddReviewDialogResult } from '../../shared/add-review-dialog/add-review-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as NotificationActions from '../../core/store/notification/notification.actions';
@Component({
  selector: 'app-product-details',
  imports: [MatIconModule,
    CommonModule,
    RouterLinkWithHref
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product$!: Observable<Product | undefined>;

  images$!: Observable<Image[]>;

  public environment = environment.apiUrl;

  constructor(protected store: Store, private apiService: ApiService, private authService: AuthService, private dialog: MatDialog) { }

  readonly router = inject(ActivatedRoute);
  id: number | undefined;
  isFavorite$!: Observable<boolean>;

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const idFromRoute = params.get('id');
      this.id = idFromRoute ? parseInt(idFromRoute, 10) : 0;

      this.product$ = this.store.select(selectProductById(this.id));

      this.store.dispatch(ImagesActions.loadImagesByProduct({ productId: this.id }));
      this.images$ = this.store.select(selectImagesByProduct(this.id));

      this.isFavorite$ = this.store.select(
        FavoriteSelectors.selectIsFavorite(this.id)
      );
    });
  }

  async addToCart() {
    this.store.dispatch(CartActions.addItem({ productId: this.id!, quantity: 1 }));
    this.store.dispatch(CartActions.addToCartSuccess({ productId: this.id!, quantity: 1 }));
    this.store.dispatch(FavoriteActions.removeItem({ productId: this.id! }));

  }


  toggleFavorite(productId: number) {
    this.isFavorite$.pipe(take(1)).subscribe(isFav => {
      if (isFav) {
        this.store.dispatch(FavoriteActions.removeItem({ productId }));
        this.store.dispatch(FavoriteActions.removeFromFavoriteSuccess({ productId: productId }));
      } else {
        this.store.dispatch(FavoriteActions.addItem({ productId }));
        this.store.dispatch(FavoriteActions.addToFavoriteSuccess({ productId: productId }));
      }
    });

  }

  canUserReview(idProduct: number) {
    this.authService.getUserId().subscribe(userId => {
      console.log(userId);
      if (userId != 0) {
        this.apiService.canUserReview(userId as number, idProduct)
          .subscribe(canReview => {
            if (canReview) {
              const dialogRef = this.dialog.open<AddReviewDialogComponent, AddReviewDialogData, AddReviewDialogResult>(
                AddReviewDialogComponent,
                {
                  width: '400px',
                  data: {
                    productId: idProduct,
                    userId: userId as number
                  }
                }
              );
            } else {
              const dialogRef = this.dialog.open<AddReviewDialogComponent, AddReviewDialogData, AddReviewDialogResult>(
                AddReviewDialogComponent,
                {
                  width: '400px',
                  data: {
                    productId: idProduct,
                    userId: 0
                  }
                }
              );
            }
          });
      } else {
        console.log("aici");
        this.store.dispatch(
          NotificationActions.showNotification({
            message: "Pentru a lăsa o recenzie, trebuie să vă logați în contul dumneavoastră.",
            notificationType: 'warning',
          })
        );

        setTimeout(() => {
          this.store.dispatch(NotificationActions.hideNotification());
        }, 3000);

      }


    });
  }



}
