import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../../core/interfaces/order.interface';
import { Store } from '@ngrx/store';
import * as OrderActions from "../../core/store/order/order.actions"
import * as OrderSelectors from "../../core/store/order/order.selectors"
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/interfaces/product.interface';

import * as  SelectProducts from '../../core/store/products/products.selectors';

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
  statusOptions = ['PLASATA', 'CONFIRMATA', 'LIVRATA', 'ANULATA'];
  currentStatusTab = 'PLASATA';

  filteredOrders$: Observable<Order[]> | undefined;

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadOrders());
    this.orders$ = this.store.select(OrderSelectors.selectAllOrders);
    this.products$ = this.store.select(SelectProducts.selectAllProductsWithPrimaryImage);
    this.loading$ = this.store.select(OrderSelectors.selectOrderLoading);
    this.updateFilteredOrders();
  }

  setCurrentTab(status: string) {
    this.currentStatusTab = status;
    this.updateFilteredOrders();
  }

  updateFilteredOrders() {
    this.filteredOrders$ = this.orders$.pipe(
      map(orders =>
        orders.filter(order => order.status === this.currentStatusTab)
      )
    );
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
