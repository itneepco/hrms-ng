export const JWT_TOKEN_NAME = 'token'

export const CL_CODE = '01';
export const RH_CODE = '02';
export const EL_CODE = '03';
export const HPL_CODE = '04';
export const HD_CL_CODE = '05';

export const LEAVE_TYPES = [
  { code: CL_CODE, description: "CL" },
  { code: RH_CODE, description: "RH" },
  { code: EL_CODE, description: "EL" },
  { code: HPL_CODE, description: "HPL" }
]

export const EL_HPL_ADMIN = 'RMAPEL'
export const TIME_OFFICE_ADMIN = 'RMAPTO'
export const VEHICLE_ADMIN = 'RMAPVH'
export const TRAINING_ADMIN = 'RMAPTR'
export const OM_REP_UPLOADER = 'RMAROM'
export const HR_REP_UPLOADER = ' RMARHR'
export const FIN_REP_UPLOADER = 'RMARFN'
export const HR_LEAVE_SUPER_ADMIN = 'RMASHR'

export const EMPLOYEE_ROLES = [
  { name: "EL HPL Admin", code: EL_HPL_ADMIN },
  { name: "Time Office Admin", code: TIME_OFFICE_ADMIN } ,
  { name: "Vehicle Admin", code: VEHICLE_ADMIN },
  { name: "Training Admin", code: TRAINING_ADMIN },
  { name: "O&M Report Uploader", code: OM_REP_UPLOADER },
  { name: "HR Report Uploader", code: HR_REP_UPLOADER },
  { name: "Finance Report Uploader", code: FIN_REP_UPLOADER },
  { name: "HR Leave Super Admin", code: HR_LEAVE_SUPER_ADMIN }
]

export const CALENDAR_COLORS = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#25A707',
    secondary: '#E9FEE4'
  }
};
