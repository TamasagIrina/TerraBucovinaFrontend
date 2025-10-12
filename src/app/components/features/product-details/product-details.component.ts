import { Component, Input } from '@angular/core';

import { Product } from '../../core/interfaces/product.interface';

import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
 @Input() product!: Product;
}
