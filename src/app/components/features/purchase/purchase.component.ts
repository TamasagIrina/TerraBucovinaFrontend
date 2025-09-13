import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-purchase',
  imports: [RouterModule,
    CommonModule,
    FormsModule 
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {
  tab: 'card' | 'cod' | 'bank' = 'card';

  shippingMethod: 'curier' | 'pickup' = 'curier';

  submitOrder() {
    console.log('Metoda aleasă:', this.shippingMethod);
   
  }

  setTab(next: 'card' | 'cod' | 'bank') {
    this.tab = next;
  }
}
