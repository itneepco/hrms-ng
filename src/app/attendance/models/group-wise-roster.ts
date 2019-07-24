export interface GroupRoster {
  day: Date,
  group_shifts: [{
    group_id: number,
    shift_id: number
  }]
}

export interface GroupRosterForm {
  rosters: GroupRoster[]
}
