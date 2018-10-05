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