export const IN_HOUSE_TRAINING = '01'
export const EXTERNAL_TRAINING = '02'

export const TRAINING_TYPES = [
  { name: "In-House Training", code: IN_HOUSE_TRAINING }, 
  { name: "External Training", code: EXTERNAL_TRAINING }
]

export const TRAINING_CREATED = '01'
export const TRAINING_PUBLISHED = '02'
export const TRAINING_COMPLETED = '03'

export const ESSENTIAL_NEED_TYPE = '01'
export const DESIRABLE_NEED_TYPE = '02'
export const NEED_TYPES = [
  { name: "Essential", value: ESSENTIAL_NEED_TYPE },
  { name: "Desirable", value: DESIRABLE_NEED_TYPE }
]

export const SHORT_TERM_DURATION = '01'
export const LONG_TERM_DURATION = '02'
export const TRAINING_DURATIONS = [
  { name: "Short Term", value: SHORT_TERM_DURATION },
  { name: "Long Term", value: LONG_TERM_DURATION }
]