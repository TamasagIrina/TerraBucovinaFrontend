import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api-service/api.service';
import { OrderResponse } from '../../core/interfaces/order.interface';

@Component({
  selector: 'app-see-all-oreders',
  imports: [CommonModule, FormsModule],
  templateUrl: './see-all-oreders.component.html',
  styleUrl: './see-all-oreders.component.scss'
})
export class SeeAllOredersComponent {
  private api = inject(ApiService);
  private router = inject(Router);

  statusOptions = ['PLASATA', 'CONFIRMATA', 'LIVRATA', 'ANULATA'];

  // --- Signal state (server-side pagination) ---
  readonly orders = signal<OrderResponse[]>([]);
  readonly currentStatusTab = signal<string>('PLASATA');
  readonly page = signal<number>(0);
  readonly totalPages = signal<number>(0);
  readonly totalElements = signal<number>(0);
  readonly loading = signal<boolean>(false);
  readonly size = 5;

  /** Per-order pending status selection, applied only on Save. */
  pending: Record<number, string> = {};

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.api.getAllOrdersPaged(this.page(), this.size, this.currentStatusTab()).subscribe({
      next: (res) => {
        this.orders.set(res.content);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.orders.set([]);
        this.loading.set(false);
      }
    });
  }

  setCurrentTab(status: string): void {
    this.currentStatusTab.set(status);
    this.page.set(0);
    this.pending = {};
    this.load();
  }

  // --- pagination controls ---
  nextPage(): void {
    if (this.page() + 1 < this.totalPages()) {
      this.page.update(p => p + 1);
      this.load();
    }
  }

  prevPage(): void {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
      this.load();
    }
  }

  goToPage(p: number): void {
    if (p !== this.page() && p >= 0 && p < this.totalPages()) {
      this.page.set(p);
      this.load();
    }
  }

  pageNumbers(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i);
  }

  viewDetails(orderId: number): void {
    this.router.navigate(['admin/order-details', orderId]);
  }

  // --- status change (save / cancel) ---
  currentSelection(order: OrderResponse): string {
    return this.pending[order.id] ?? (order.status ?? '');
  }

  onSelect(order: OrderResponse, value: string): void {
    this.pending[order.id] = value;
  }

  hasChange(order: OrderResponse): boolean {
    return order.id in this.pending && this.pending[order.id] !== order.status;
  }

  saveStatus(order: OrderResponse): void {
    if (!this.hasChange(order)) {
      return;
    }
    this.api.updateOrderStatus(order.id, this.pending[order.id]).subscribe(() => {
      delete this.pending[order.id];
      this.load(); // refresh the current page (the order may leave the current status tab)
    });
  }

  cancelStatus(order: OrderResponse): void {
    delete this.pending[order.id];
  }
}
