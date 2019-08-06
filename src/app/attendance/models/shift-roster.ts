export interface ShiftRoster {
  day: Date,
  group_shifts: [{
    group_id: number,
    shift_id: number
  }]
}

export interface ShiftRosterForm {
  rosters: ShiftRoster[]
}
