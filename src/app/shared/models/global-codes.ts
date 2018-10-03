export const CL_CODE = '01';
export const RH_CODE = '02';
export const EL_CODE = '03';
export const HPL_CODE = '04';
export const HD_CL_CODE = '05';

export const LEAVE_TYPES = [
  { code: CL_CODE, name: "CL" },
  { code: RH_CODE, name: "RH" },
  { code: EL_CODE, name: "EL" },
  { code: HPL_CODE, name: "HPL" }
]

export const LEAVE_APPLIED = '01'
export const LEAVE_APPROVED = '02'
export const LEAVE_RECOMMENDED = '03'
export const LEAVE_NOT_RECOMMENDED = '04'
export const LEAVE_CALLBACKED = '05'

export const PROCESS_ACTION_TYPES = [
  { code: LEAVE_APPROVED, name: "Leave Approved" },
  { code: LEAVE_RECOMMENDED, name: "Leave Recommended" },
  { code: LEAVE_NOT_RECOMMENDED, name: "Leave Not Recommended" },
]

export const EL_ML_ACTION_TYPES = [
  { code: LEAVE_RECOMMENDED, name: "Leave Recommended" },
  { code: LEAVE_NOT_RECOMMENDED, name: "Leave Not Recommended" },
]

export const APPROVE_ACTION_TYPES = [
  { code: LEAVE_APPROVED, name: "Leave Approved" },
]

export const CALLBACK_ACTION_TYPES = [
  { code: LEAVE_CALLBACKED, name: "Callback Leave" },
]


export const TRANSACTION_PAGE = '01'
export const LEAVE_REQUEST_PAGE = '02'
export const LEAVE_PROCESSED_PAGE = '03'
export const LEAVE_APPROVED_PAGE = '04'

export const EL_ADMIN = 'RMAPEL';
export const MEDICAL_ADMIN = 'RMAPML'
export const TIME_OFFICE_ADMIN = 'RMAPTO'
export const VEHICLE_ADMIN = 'RMAPVH'
export const TRAINING_ADMIN = 'RMAPTR'

export const EMPLOYEE_ROLES = [
  { name: "Earned Leave Admin", code: EL_ADMIN },
  { name: "Medical Admin", code: MEDICAL_ADMIN },
  { name: "Time Office Admin", code: TIME_OFFICE_ADMIN } ,
  { name: "Vehicle Admin", code: VEHICLE_ADMIN },
  { name: "Training Admin", code: TRAINING_ADMIN }   
]