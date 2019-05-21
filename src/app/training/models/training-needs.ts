import { Employee } from './../../shared/models/employee';

export interface ExecutiveNeed {
  id: number;
  emp_code: string;
  need_type: string;
  duration: string;
  training_label: TrainingLabel;
  topic: string;
  year: string;
  hod_remarks: string;
}

export interface NonExecutiveNeed {
  id: number;
  training_label: TrainingLabel;
  topic: string;
  hod_remarks: string;
}

export interface TrainingLabel {
  id: number;
  name: string;
}

export interface TrainingNeedInfo {
  id: number;
  year: string;
  emp_code: string;
  status: string;
  cadre: string;
  addressee: string;
  created_at: string;
  updated_at: string;
  training_need_info_hists?: TrainingNeedHistory[];
}

export interface TrainingNeedHistory {
  id: number;
  training_need_info_id: number;
  workflow_action: string;
  officer_emp_code: string;
  remarks: string;
  created_at: string;
  updated_at: string;
  officer?: Employee;
}
