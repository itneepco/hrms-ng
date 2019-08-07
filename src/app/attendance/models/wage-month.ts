export interface WageMonth {
  id: number;
  project_id: number;
  from_date: Date;
  to_date: Date;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WageMonthForm {
  from_date: Date;
  to_date: Date;
}
