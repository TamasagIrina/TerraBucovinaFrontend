import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../core/interfaces/order.interface';
import { Store } from '@ngrx/store';
import * as OrderActions from "../../core/store/order/order.actions"
import * as OrderSelectors from "../../core/store/order/order.selectors"
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/interfaces/product.interface';

import * as  SelectProducts  from '../../core/store/products/products.selectors';

@Component({
  selector: 'app-see-all-oreders',
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './see-all-oreders.component.html',
  styleUrl: './see-all-oreders.component.scss'
})
export class SeeAllOredersComponent {
  orders$!: Observable<Order[]>;
  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;
  statusOptions = [
    "PLASATA",
    "CONFIRMATA",
    "LIVRATA",
    "ANULATA"];

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.orders$ = this.store.select(OrderSelectors.selectAllOrders);
    this.products$= this.store.select(SelectProducts.selectAllProductsWithPrimaryImage);
    this.loading$ = this.store.select(OrderSelectors.selectOrderLoading);
    this.store.dispatch(OrderActions.loadOrders());
  }

 onStatusChange(order: Order, newStatus: string) {
  this.store.dispatch(
    OrderActions.updateOrderStatus({
      orderId: order.id,
      status: newStatus
    })
  );
}

}
