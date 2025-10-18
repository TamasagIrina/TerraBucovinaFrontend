import { Component } from '@angular/core';

import { ProductsActions } from '../../core/store/products/products.actions'
import { Product } from '../../core/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-product',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
product: Product = {
    id: 0,
    name: '',
    price: 0,
    main_image_url: '',
    short_desc: '',
    long_desc: '',
    category: '',
    stock_qty: 0,
    createdAt:'',
    updatedAt:''
   
  };

  constructor(private store: Store) { }

  onSubmit(): void {
   
    this.store.dispatch(ProductsActions.addProduct({ product: this.product }));
  }
}
