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
