import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../core/interfaces/order.interface';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { loadOrdersByCustomer } from '../../core/store/order/order.actions';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { selectCustomerOrders } from '../../core/store/order/order.selectors';

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

  constructor(private store: Store, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserId().subscribe(userId => {
      this.store.dispatch(loadOrdersByCustomer({ customerId: userId }));
      this.orders$= this.store.select(selectCustomerOrders);
    });

  }

}


