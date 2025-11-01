import { Dealer } from "./dealer";

export interface DebtSummary {
  totalDealers: number;
  totalDebt: number;
  dealersWithDebt: number;
  averageDebt: number;
}

export interface DebtReportResponse {
  success: boolean;
  summary: DebtSummary;
  dealers: Dealer[];
}
