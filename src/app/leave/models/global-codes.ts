export const CL_CODE = '01';
export const RH_CODE = '02';

export const LEAVE_TYPES = [
	{ code: CL_CODE, name: "CL" },
	{ code: RH_CODE, name: "RH" }
]

export const LEAVE_APPLIED = '01'
export const LEAVE_APPROVED = '02'
export const LEAVE_RECOMMENDED = '03'
export const LEAVE_NOT_RECOMMENDED = '04'
export const LEAVE_REJECTED = '05'

export const ACTION_TYPES = [
	{ code: LEAVE_APPROVED, name: "Leave Approved" },
	{ code: LEAVE_RECOMMENDED, name: "Leave Recommended" },
	{ code: LEAVE_NOT_RECOMMENDED, name: "Leave Not Recommended" },
	{ code: LEAVE_REJECTED, name: "Leave Rejected" },
]
