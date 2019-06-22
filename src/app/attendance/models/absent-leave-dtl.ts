export interface AbsentLeaveDetail {
  id: number;
  emp_num: string;
  yymm: string;
  eol_absent_days: number;
  cl_days: number;
  sl_days: number;
  el_days: number;
  hpl_days: number;
  trng_days: number;
  tour_days: number;
  other_leave: number;
  created_at: string;
  updated_at: string;
}
