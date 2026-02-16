import { Component } from '@angular/core';

import { ProductsActions } from '../../core/store/products/products.actions'

import { ImagesActions } from '../../core/store/images/images.actions'
import { Product } from '../../core/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { Category } from '../../core/interfaces/category.interface';
import { CategoriesActions } from '../../core/store/categoris/category.actions';
import { selectAllCategories } from '../../core/store/categoris/category.selectors';
import {DebounceButtonDirective} from '../../core/directives/debounce-button.directive';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DebounceButtonDirective
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  product: Product = {

    id: 0,
    name: '',
    price: 0,
    shortDesc: '',
    longDesc: '',
    notification: '',
    ingredients: '',
    scientificStudies: '',
    stockQty: 0,
    mainImageUrl: null,
    createdAt: '',
    updatedAt: '',
    categories: {
      id: 0,
      name: '',
      description: ''
    }

  };
  categories: Category[] = [];

  previewImages: { file: File; url: string }[] = [];
  selectedMainImageIndex = 0;
  private actionsSubscription: Subscription;

  constructor(private store: Store, private actions$: Actions) {
    // ascultă acțiunea de succes
    this.actionsSubscription = this.actions$
      .pipe(ofType(ProductsActions.addProductSuccess))
      .subscribe(({ product }) => {
        if (product.id) {
          this.uploadImages(product.id);
        }

        
      });
  }

  ngOnInit() {
    // load categories
    this.store.dispatch(CategoriesActions.loadCategories());

    this.store.select(selectAllCategories).subscribe(c => {
      this.categories = c;
    });


  }

  resetFormFields() {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      shortDesc: '',
      longDesc: '',
      notification: '',
      ingredients: '',
      scientificStudies: '',
      stockQty: 0,
      mainImageUrl: null,
      createdAt: '',
      updatedAt: '',
      categories: {
        id: 0,
        name: '',
        description: ''
      }
    };

    const fileInput = document.querySelector("#fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
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
    this.product.mainImageUrl = this.previewImages[index].url;
  }

  removeImage(index: number): void {
    this.previewImages.splice(index, 1);

    if (this.selectedMainImageIndex === index) {
      this.selectedMainImageIndex = 0;
      if (this.previewImages.length > 0) {
        this.product.mainImageUrl = this.previewImages[0].url;
      } else {
        this.product.mainImageUrl = '';
      }
    } else if (this.selectedMainImageIndex > index) {
      this.selectedMainImageIndex--;
    }
  }

  onSubmit(): void {
    console.log(this.product);
    this.store.dispatch(ProductsActions.addProduct({ product: this.product }));

  }

  uploadImages(productId: number) {
    this.previewImages.forEach((img, index) => {

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

    this.resetFormFields();
  }

}
