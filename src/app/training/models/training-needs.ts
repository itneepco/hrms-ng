export interface ExecutiveNeed {
  id: number
  need_type: string
  duration: string
  training_label: TrainingLabel
  topic: string
  year: string
  hod_remarks: string
}

export interface TrainingLabel {
  id: number
  name: string
}