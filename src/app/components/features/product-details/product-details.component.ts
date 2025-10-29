import { Component, inject, Input } from '@angular/core';

import { Product } from '../../core/interfaces/product.interface';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectProductById } from '../../core/store/products/products.selectors';
import { Observable } from 'rxjs';
import { Image } from '../../core/interfaces/image.interface';
import { ImagesActions } from '../../core/store/images/images.actions';
import { selectImagesByProduct } from '../../core/store/images/images.selectors';
import { environment } from '../../../../environments/environment';

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

  constructor(protected store: Store) { }

  readonly router = inject(ActivatedRoute);
  id: number | undefined;


 ngOnInit(): void {
  this.router.paramMap.subscribe(params => {
    const idFromRoute = params.get('id');
    this.id = idFromRoute ? parseInt(idFromRoute, 10) : 0;

   
    this.product$ = this.store.select(selectProductById(this.id));

    
    this.store.dispatch(ImagesActions.loadImagesByProduct({ productId: this.id }));
    this.images$ = this.store.select(selectImagesByProduct(this.id));
  });
}



}
