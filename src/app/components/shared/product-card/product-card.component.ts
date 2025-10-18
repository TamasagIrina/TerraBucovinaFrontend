import { Component, Input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { Product } from '../../core/interfaces/product.interface';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private router: Router){
    
  }
  // addToFavorite(){
  //   this.product.isAddedToFav=!this.product.isAddedToFav;
  // }

  goToDetail(){
    this.router.navigate(['/details'], { state: { product: this.product } });
  }
}
