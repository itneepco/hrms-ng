export interface ExecutiveNeed {
  id: number
  emp_code: string
  need_type: string
  duration: string
  training_label: TrainingLabel
  topic: string
  year: string
  hod_remarks: string
}

export interface NonExecutiveNeed {
  id: number
  training_label: TrainingLabel
  topic: string
  hod_remarks: string
}

export interface TrainingLabel {
  id: number
  name: string
}

export interface TrainingNeedInfo {
  id: number
  year: string
  emp_code: string
  status: string
  cadre: string
}

export interface TrainingNeedHistory {
  id: number
  year: string
  workflow_action: string
  officer_emp_code: string
  remarks: string
}