export const ATTENDANCE_PRESENT = "01";
export const ATTENDANCE_ABSENT = "02";
export const ATTENDANCE_HALF_DAY = "03";
export const ATTENDANCE_LATE = "04";
export const ATTENDANCE_OFF_DAY = "05";
export const ATTENDANCE_HOLIDAY = "06";
export const ATTENDANCE_ABSENT_OFFICIALLY = "07";
export const ATTENDANCE_EXEMPTED = "08";
export const ATTENDANCE_5D_LATE = "09";

// Punching regularize/exemption status
export const APPLIED = "01";
export const RECOMMENDED = "02";
export const APPROVED = "03";
export const NOT_RECOMMENDED = "04";
export const REJECTED = "05";
export const CALLBACK = "06";

// For controlling officer
export const ATTEND_REG_CO_ACTIONS = [
  { name: "Recommend punching regularization", value: RECOMMENDED },
  { name: "Not recommended for regularization", value: RECOMMENDED }
]

// For time officer
export const ATTEND_REG_TIME_ACTIONS = [
  { name: "Approve regularization", value: APPROVED },
  { name: "Reject regularization", value: REJECTED }
]