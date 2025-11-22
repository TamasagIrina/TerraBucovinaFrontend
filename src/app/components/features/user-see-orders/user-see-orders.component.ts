import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../core/interfaces/order.interface';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-see-orders',
  imports: [CommonModule,
    RouterLink
  ],
  templateUrl: './user-see-orders.component.html',
  styleUrl: './user-see-orders.component.scss'
})
export class UserSeeOrdersComponent {

    orders$!: Observable<Order[]> ;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Incarcam comenzile automat cand intra pe pagina
    // this.store.dispatch();
  }

}


