export interface DashboardSummary {
  totalOrders: number;
  delivered: number;
  topDealers: { id: string; orders: number }[];
}
export interface TrendDashboard {
  _id: string;
  orders: number;
}
