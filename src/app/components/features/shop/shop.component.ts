import { T } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-shop',
  imports: [
    MatIconModule,
    CommonModule
  
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  @ViewChild('scrollArea', { static: false }) scrollArea!: ElementRef<HTMLDivElement>;



  products = [
    { id:1, name: 'Extract floral I', price: 59, image: 'assets/images/stejar-copac-terrabucovina.jpg',  isAddedToFav:false },
    { id:2, name: 'Extract floral II', price: 62, image: 'assets/images/stejar-copac-terrabucovina.jpg',  isAddedToFav:false },
    {  id:3, name: 'Ceai relaxant', price: 28, image: 'assets/images/stejar-copac-terrabucovina.jpg',  isAddedToFav:false },
    { id:4, name: 'Ulei esențial', price: 79, image: 'assets/images/stejar-copac-terrabucovina.jpg',  isAddedToFav:false },
    { id:5, name: 'Balsam natural', price: 44, image: 'assets/images/stejar-copac-terrabucovina.jpg',  isAddedToFav:false},
    { id:6, name: 'Ceai relaxant', price: 28, image: 'assets/images/stejar-copac-terrabucovina.jpg' ,  isAddedToFav:false},
    { id:7, name: 'Ulei esențial', price: 79, image: 'assets/images/stejar-copac-terrabucovina.jpg',  isAddedToFav:false},
    { id:8, name: 'Balsam natural', price: 44, image: 'assets/images/stejar-copac-terrabucovina.jpg',  isAddedToFav:false},
  ];

  scrollRow(dir: 'left' | 'right') {
    const el = this.scrollArea.nativeElement;
    const step = 260;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  }

  addToFavorite(id:number){
    for (const product of this.products){
      if( product.id==id){
        product.isAddedToFav= !product.isAddedToFav;
      }
    }
  }
}
