export const TRANSACTION_PAGE = '01'
export const LEAVE_REQUEST_PAGE = '02'
export const LEAVE_PROCESSED_PAGE = '03'

//Leave status codes
export const LEAVE_APPLIED = '01'
export const LEAVE_APPROVED = '02'
export const LEAVE_RECOMMENDED = '03'
export const LEAVE_NOT_RECOMMENDED = '04'
export const LEAVE_CALLBACKED = '05'

//Leave cancellation status codes
export const LEAVE_CANCELLED = '06'
export const LEAVE_CANCEL_INITIATION = '07'
export const LEAVE_CANCEL_RECOMMENDED = '08'
export const LEAVE_CANCEL_NOT_RECOMMENDED = '09'
export const LEAVE_CANCEL_CALLBACKED = '10'

//Joining report status codes
export const JR_PENDING = '01'
export const JR_SUBMITTED = '02'
export const JR_RECOMMENDED = '03'
export const JR_ACCEPTED = '04'
export const JR_CALLBACKED = '05'

//Leave workflow action types
export const PROCESS_ACTION_TYPES = [
  { code: LEAVE_APPROVED, name: "Leave Approved" },
  { code: LEAVE_RECOMMENDED, name: "Leave Recommended" },
  { code: LEAVE_NOT_RECOMMENDED, name: "Not Recommended" },
]

export const EL_HPL_ACTION_TYPES = [
  { code: LEAVE_RECOMMENDED, name: "Leave Recommended" },
  { code: LEAVE_NOT_RECOMMENDED, name: "Not Recommended" },
]

export const APPROVE_ACTION_TYPES = [
  { code: LEAVE_APPROVED, name: "Leave Approved" },
]

export const CALLBACK_ACTION_TYPES = [
  { code: LEAVE_CALLBACKED, name: "Callback Leave" },
]

//Leave cancellation workflow action types
export const LEAVE_CANCEL_EL_HPL_ACTION_TYPES = [
  { code: LEAVE_CANCEL_RECOMMENDED, name: "Leave Cancellation Recommended" },
  { code: LEAVE_CANCEL_NOT_RECOMMENDED, name: "Leave Cancellation Not Recommended" },
]

export const LEAVE_CANCEL_PROCESS_ACTION_TYPES = [
  { code: LEAVE_CANCEL_RECOMMENDED, name: "Leave Cancellation Recommended" },
  { code: LEAVE_CANCEL_NOT_RECOMMENDED, name: "Leave Cancellation Not Recommended" },
  { code: LEAVE_CANCELLED, name: "Cancel Approved Leave"}
]

export const LEAVE_CANCEL_INITIATION_ACTION_TYPES = [
  { code: LEAVE_CANCEL_INITIATION, name: "Initiate Cancellation of Leave" },
]

export const LEAVE_CANCEL_CALLBACK_ACTION_TYPES = [
  { code: LEAVE_CANCEL_CALLBACKED, name: "Callback Leave Cancellation" },
]

export const LEAVE_CANCEL_ACTION_TYPES = [
  { code: LEAVE_CANCELLED, name: "Cancel Approved Leave" },
]

//Joining report action types
export const JR_RECOMMEND_ACTION_TYPES = [
  { code: JR_RECOMMENDED, name: "Joining Letter Recommended" }
]

export const JR_RECOMMEND_ACCEPT_ACTION_TYPES = [
  { code: JR_RECOMMENDED, name: "Joining Letter Recommended" },
  { code: JR_ACCEPTED, name: "Joining Letter Accepted" }
]

export const JR_ACCEPT_ACTION_TYPES = [
  { code: JR_ACCEPTED, name: "Joining Letter Accepted" }
]

export const JR_CALLBACK_ACTION_TYPES = [
  { code: JR_CALLBACKED, name: "Callback Joining Letter" }
]
