import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderResponse } from '../../core/interfaces/order.interface';
import * as OrderActions from '../../core/store/order/order.actions';
import { selectOrderById, selectOrderLoading } from '../../core/store/order/order.selectors';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id!: number;
  order$!: Observable<OrderResponse | undefined>;
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // Ensure orders are in the store even on a direct navigation / refresh.
    this.store.dispatch(OrderActions.loadOrders());
    this.order$ = this.store.select(selectOrderById(this.id));
    this.loading$ = this.store.select(selectOrderLoading);
  }

  lineTotal(price: number | null, qty: number | null): number {
    return (price ?? 0) * (qty ?? 0);
  }

  goBack(): void {
    this.router.navigate(['admin/see-all-orders']);
  }
}
