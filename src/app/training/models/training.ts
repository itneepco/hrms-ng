export interface TrainingInfo {
  id: number
  course_title: string
  from_date: Date
  to_date: Date
  venue: string
  objective: string
  training_type: string
  training_institute?: TrainingInstitute  //Required only for external training
  status: string  // Training status
  training_order_name: string   // Training order name
  training_participants: Participant[]
  training_feedbacks: TrainingFeedback[]
  training_topics?: TrainingTopic[]   //Required only for in-house training only
}

//model for training Form
export interface TrainingForm {
  id: number
  course_title: string
  from_date: Date
  to_date: Date
  venue: string
  objective: string
  training_type: string //Whether training is in-house or external
  training_institute_id?: number // Required only for external training
  status: string // Training status
  training_order_name: string // Training order name
}

export interface Participant {
  id: number
  training_info_id: number
  name: string
  emp_code: string
  designation: string
  project: string
  grade: string
}

//Required for in-house training
export interface TrainingTopic {
  id: number
  training_info_id: number
  topic_name: string
  faculty_name: string
  emp_code?: string
  rating?: number
  avg_rating?: number
}

//Required for external training
export interface TrainingInstitute {
  id: number
  name: string
}

export interface TrainingFeedback {
  id: number
  training_info_id: number
  emp_code: string
  ta_da_incurred: number
  comments: string
  duration_rating: number
  content_rating: number
  methodology_rating: number
  admin_service_rating: number
  overall_utility_rating: number
}

export interface TrainingEffectiveness {
  id: number
  training_info_id: number
  comments: string
  other_tr_recommendation: string // other training recommendation by controlling officer
  status: string //Whether 1) submitted by controlling officer or 2) accepted by HOD/HOP
  application_rating: number
  effectiveness_rating: number
  performance_rating: number
  positive_attitude_rating: number
  created_at: string //Timestamp
  updated_at: string //Timestamp
}

export interface TrainingAttendance {
  emp_code: string
  present: boolean
}
