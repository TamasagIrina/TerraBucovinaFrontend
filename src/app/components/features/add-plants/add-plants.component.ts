import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions'
import { Product } from '../../core/interfaces/product.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-plants',
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './add-plants.component.html',
  styleUrl: './add-plants.component.scss'
})
export class AddPlantsComponent {
  

}
