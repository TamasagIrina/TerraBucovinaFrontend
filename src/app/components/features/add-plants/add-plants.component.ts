import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions'
import { Product } from '../../core/interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { Plant } from '../../core/interfaces/plant.interfece';
import {DebounceButtonDirective} from '../../core/directives/debounce-button.directive';
import * as PlantsActions from '../../core/store/plants/plants.actions';
import { selectAllProducts } from '../../core/store/products/products.selectors';
import { selectAddPlantSuccess } from '../../core/store/plants/plants.selectors';

@Component({
  selector: 'app-add-plants',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    DebounceButtonDirective
  ],
  templateUrl: './add-plants.component.html',
  styleUrl: './add-plants.component.scss'
})
export class AddPlantsComponent {
  plant: Omit<Plant, 'id'> = {
    name: '',
    imageUrl: '',
    shortDescription: '',
    longDescription: '',
    plantMessage: '',
    product: {
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
      categories: null
    }

  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  products!: Product[];

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProducts());

    this.store.select(selectAllProducts)
      .subscribe(products => {
        this.products = products;
      });

    this.store.select(selectAddPlantSuccess).subscribe(success => {
      if (success) {
        this.resetFormFields();
      }
    });
  }


  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (!this.selectedFile) return;

    this.store.dispatch(
      PlantsActions.addPlant({
        plant: this.plant,
        file: this.selectedFile
      })
    );





  }

  resetFormFields() {
    this.plant = {
      name: '',
      imageUrl: '',
      shortDescription: '',
      longDescription: '',
      plantMessage: '',
      product: {
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
        categories: null
      }
    };

    this.selectedFile = null;
    this.previewUrl = null;

    const fileInput = document.querySelector("#fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  }


}


