export interface AttendanceFileStatus {
  punch_day: Date;
  machine_ids: string[];
  is_processed: boolean;
}