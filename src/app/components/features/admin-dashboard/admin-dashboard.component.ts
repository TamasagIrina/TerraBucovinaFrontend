import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ApiService } from '../../core/services/api-service/api.service';
import { ChartDataResponse, DashboardKpiResponse } from '../../core/interfaces/dashboard.interface';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  private api = inject(ApiService);

  // --- Signal-based dashboard state ---
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly kpis = signal<DashboardKpiResponse | null>(null);
  readonly popularProducts = signal<ChartDataResponse | null>(null);

  // --- Derived chart data (recomputes whenever popularProducts changes) ---
  readonly barChartData = computed<ChartData<'bar'>>(() => {
    const pp = this.popularProducts();
    return {
      labels: pp?.labels ?? [],
      datasets: [
        {
          data: pp?.values ?? [],
          label: 'Unități vândute',
          backgroundColor: '#16a34a',
          hoverBackgroundColor: '#15803d',
          borderRadius: 6,
          maxBarThickness: 60
        }
      ]
    };
  });

  readonly barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { precision: 0 } }
    }
  };

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      kpis: this.api.getDashboardKpis(),
      popular: this.api.getPopularProducts(5)
    }).subscribe({
      next: ({ kpis, popular }) => {
        this.kpis.set(kpis);
        this.popularProducts.set(popular);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Nu s-au putut încărca datele dashboardului.');
        this.loading.set(false);
      }
    });
  }
}
