/**
 * Admin dashboard read models — mirror the backend DTOs
 * (DashboardKpiResponseDTO / ChartDataResponseDTO).
 */
export interface DashboardKpiResponse {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalReviews: number;
  pendingOrders: number;
  totalRevenue: number;
}

export interface ChartDataResponse {
  labels: string[];
  values: number[];
}
