import { MemberData } from "./member-data";
import { PfDetailData } from "./pf-detail-data";
import { PfMonthlyData } from "./pf-monthly-data";
import { SummaryData } from "./summary-data";

export interface PfReport {
  finYear: string;
  intRate: number;
  memberData: MemberData;
  monthlyData: PfMonthlyData[];
  summaryData: SummaryData;
}
