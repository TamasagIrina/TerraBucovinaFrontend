import { Component } from '@angular/core';

import { ProductsActions } from '../../core/store/products/products.actions'

import { ImagesActions } from '../../core/store/images/images.actions'
import { ProductRequest } from '../../core/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { Category } from '../../core/interfaces/category.interface';
import { CategoriesActions } from '../../core/store/categoris/category.actions';
import { selectAllCategories } from '../../core/store/categoris/category.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api-service/api.service';
import { Image } from '../../core/interfaces/image.interface';
import { selectImagesByProduct } from '../../core/store/images/images.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  product: ProductRequest = {
    name: '',
    price: 0,
    shortDesc: '',
    longDesc: '',
    notification: '',
    ingredients: '',
    scientificStudies: '',
    stockQty: 0,
    mainImageUrl: null,
    categoryId: 0
  };
  categories: Category[] = [];

  previewImages: { file: File; url: string }[] = [];
  selectedMainImageIndex = 0;

  editMode = false;
  productId: number | null = null;

  existingImages$!: Observable<Image[]>;

  private actionsSubscription: Subscription;

  constructor(
    private store: Store,
    private actions$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    // CREATE: after the product is created, upload its images, then reset.
    this.actionsSubscription = this.actions$
      .pipe(ofType(ProductsActions.addProductSuccess))
      .subscribe(({ product }) => {
        if (product.id) {
          this.uploadImages(product.id);
        }
      });

    // EDIT: after a successful update, upload any newly added images and leave.
    this.actionsSubscription.add(
      this.actions$
        .pipe(ofType(ProductsActions.updateProductSuccess))
        .subscribe(({ product }) => {
          if (this.previewImages.length > 0 && product.id) {
            this.uploadImages(product.id);
          }
          this.router.navigate(['/shop']);
        })
    );
  }

  ngOnInit() {
    // load categories
    this.store.dispatch(CategoriesActions.loadCategories());

    this.store.select(selectAllCategories).subscribe(c => {
      this.categories = c;
    });

    // Edit mode when the route carries an :id — fetch the product and patch the form.
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      this.productId = Number(idParam);

      this.apiService.getProductById(this.productId).subscribe(res => {
        this.product = {
          name: res.name,
          price: res.price,
          shortDesc: res.shortDesc ?? '',
          longDesc: res.longDesc ?? '',
          notification: res.notification ?? '',
          ingredients: res.ingredients ?? '',
          scientificStudies: res.scientificStudies ?? '',
          stockQty: res.stockQty ?? 0,
          mainImageUrl: res.mainImageUrl,
          categoryId: res.categoryId ?? 0
        };
      });

      this.store.dispatch(ImagesActions.loadImagesByProduct({ productId: this.productId }));
      this.existingImages$ = this.store.select(selectImagesByProduct(this.productId)).pipe(
        map(images => [...images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)))
      );
    }
  }

  setPrimary(image: Image): void {
    this.store.dispatch(ImagesActions.setPrimaryImage({ imageId: image.id }));
  }

  deleteExisting(image: Image): void {
    if (!confirm('Sigur vrei să ștergi această imagine?')) return;
    this.store.dispatch(ImagesActions.deleteImage({ imageId: image.id }));
  }

  moveImage(images: Image[], index: number, direction: -1 | 1): void {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;

    const reordered = [...images];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

    this.store.dispatch(ImagesActions.reorderImages({ orderedImageIds: reordered.map(i => i.id) }));
  }

  ngOnDestroy() {
    this.actionsSubscription?.unsubscribe();
  }

  resetFormFields() {
    this.product = {
      name: '',
      price: 0,
      shortDesc: '',
      longDesc: '',
      notification: '',
      ingredients: '',
      scientificStudies: '',
      stockQty: 0,
      mainImageUrl: null,
      categoryId: 0
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
    if (this.editMode && this.productId != null) {
      // Preserve the existing mainImageUrl on update (don't wipe it).
      const productToSend: ProductRequest = { ...this.product };
      this.store.dispatch(ProductsActions.updateProduct({ id: this.productId, product: productToSend }));
    } else {
      // On create the primary image URL is set later, after image upload.
      const productToSend: ProductRequest = { ...this.product, mainImageUrl: null };
      this.store.dispatch(ProductsActions.addProduct({ product: productToSend }));
    }
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
