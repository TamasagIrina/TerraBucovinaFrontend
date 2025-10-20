import { Component } from '@angular/core';

import { ProductsActions } from '../../core/store/products/products.actions'

import { ImagesActions } from '../../core/store/images/images.actions'
import { Product } from '../../core/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

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
    shortDesc: '',
    longDesc: '',
    category: '',
    stockQty: 0,
    createdAt: '',
    updatedAt: ''
  };


  previewImages: { file: File; url: string }[] = [];
  selectedMainImageIndex = 0; 
    private actionsSubscription: Subscription;

  constructor(private store: Store, private actions$: Actions) {
    // ascultă acțiunea de succes
    this.actionsSubscription = this.actions$
      .pipe(ofType(ProductsActions.addProductSuccess))
      .subscribe(({ product }) => {
        if (product.id) {
          console.log('intraaa', product.id)

          this.uploadImages(product.id); // trimite pozele cu product.id
        }
      });
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImages.push({
            file,
            url: reader.result as string
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  selectMainImage(index: number): void {
    this.selectedMainImageIndex = index;
    this.product.main_image_url = this.previewImages[index].url;
  }

  removeImage(index: number): void {
    this.previewImages.splice(index, 1);

    if (this.selectedMainImageIndex === index) {
      this.selectedMainImageIndex = 0;
      if (this.previewImages.length > 0) {
        this.product.main_image_url = this.previewImages[0].url;
      } else {
        this.product.main_image_url = '';
      }
    } else if (this.selectedMainImageIndex > index) {
      this.selectedMainImageIndex--;
    }
  }

  onSubmit(): void {
    this.store.dispatch(ProductsActions.addProduct({ product: this.product }));
  }

    uploadImages(productId: number) {
    this.previewImages.forEach((img, index) => {
       console.log('intraaa', img, index)
      this.store.dispatch(
        ImagesActions.uploadImage({
          productId: productId,
          file: img.file,
          altText: '',
          sortOrder: index,
          isPrimary: this.selectedMainImageIndex === index
        })
      );
    });
  }

}
