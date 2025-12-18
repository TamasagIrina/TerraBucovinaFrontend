import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../../core/interfaces/order.interface';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { loadOrdersByCustomer } from '../../core/store/order/order.actions';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { selectCustomerOrders } from '../../core/store/order/order.selectors';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewDialogComponent, AddReviewDialogData, AddReviewDialogResult } from '../../shared/add-review-dialog/add-review-dialog.component';
import { U } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-user-see-orders',
  imports: [CommonModule,
    RouterLink
  ],
  templateUrl: './user-see-orders.component.html',
  styleUrl: './user-see-orders.component.scss'
})
export class UserSeeOrdersComponent {

  orders$!: Observable<Order[]>;
  userId: number | undefined;
  statusOptions = ['PLASATA', 'CONFIRMATA', 'LIVRATA', 'ANULATA'];
  currentStatusTab = 'PLASATA';

  filteredOrders$: Observable<Order[]> | undefined;

  constructor(private store: Store, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.getUserId().subscribe(userId => {
      this.userId = userId;
      this.store.dispatch(loadOrdersByCustomer({ customerId: userId }));
      this.orders$ = this.store.select(selectCustomerOrders);
      this.updateFilteredOrders();
    });

  }
  openReviw(id: number) {
    this.dialog.open<AddReviewDialogComponent, AddReviewDialogData, AddReviewDialogResult>(
      AddReviewDialogComponent,
      {
        width: '400px',
        data: {
          productId: id,
          userId: this.userId as number
        }
      }
    );
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



}


