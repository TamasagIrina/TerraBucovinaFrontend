import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions'
import { ProductResponse } from '../../core/interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { Plant } from '../../core/interfaces/plant.interfece';
import {DebounceButtonDirective} from '../../core/directives/debounce-button.directive';
import * as PlantsActions from '../../core/store/plants/plants.actions';
import { selectAllProducts } from '../../core/store/products/products.selectors';
import { selectAddPlantSuccess } from '../../core/store/plants/plants.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api-service/api.service';

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
  products!: ProductResponse[];

  editMode = false;
  plantId: number | null = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // Admin-only route (guarded) — always include inactive products so a
    // plant can still be attached to one that's temporarily deactivated.
    this.store.dispatch(ProductsActions.loadProducts({ includeInactive: true }));

    this.store.select(selectAllProducts)
      .subscribe(products => {
        this.products = products;
      });

    this.store.select(selectAddPlantSuccess).subscribe(success => {
      if (success && !this.editMode) {
        this.resetFormFields();
      }
    });

    // Edit mode when the route carries an :id — fetch the plant and patch the form.
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      this.plantId = Number(idParam);

      this.apiService.getPlantById(this.plantId).subscribe(res => {
        this.plant = {
          name: res.name,
          imageUrl: res.imageUrl,
          shortDescription: res.shortDescription,
          longDescription: res.longDescription,
          plantMessage: res.plantMessage,
          product: { ...this.plant.product, id: (res as any).productId ?? (res as any).product?.id }
        };
        this.previewUrl = res.imageUrl;
      });
    }
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
    if (this.editMode && this.plantId != null) {
      // A new file is optional on edit — the backend keeps the existing image if none is sent.
      this.store.dispatch(
        PlantsActions.updatePlant({
          plant: { ...this.plant, id: this.plantId },
          file: this.selectedFile
        })
      );
      this.router.navigate(['/about-plants']);
      return;
    }

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


