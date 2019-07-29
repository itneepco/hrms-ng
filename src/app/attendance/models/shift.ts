export interface Shift {
  id: number;
  name: string;
  project_id: number;
  in_time_start: string;
  in_time_end: string;
  out_time_start: string;
  out_time_end: string;
  late_time: string;
  half_time: string;
  is_night_shift: boolean;
  is_general: boolean;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}
