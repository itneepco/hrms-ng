import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/attendance/models/group';
import { GroupRoster } from 'src/app/attendance/models/group-wise-roster';
import { DateService } from 'src/app/attendance/services/date.service';
import { ShiftRosterService } from 'src/app/attendance/services/shift-roster.service';
import { ShiftService } from 'src/app/attendance/services/shift.service';

import { Shift } from '../../../models/shift';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: "app-group-roster",
  templateUrl: "./shift-roster.component.html",
  styleUrls: ["./shift-roster.component.scss"]
})
export class ShiftRosterComponent implements OnInit {
  shifts: Shift[];
  groups: Group[];
  dates: Date[];
  startDate = new Date(2019, 5, 16);
  endDate = new Date(2019, 6, 15);
  rosterForm: FormGroup;
  shiftRosters: GroupRoster[];
  isSubmitting = false;

  constructor(
    private shiftService: ShiftService,
    private groupService: GroupService,
    private fb: FormBuilder,
    private shiftRosterService: ShiftRosterService,
    private dateService: DateService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dates = this.dateService.enumerateDaysBetweenDates(
      this.startDate,
      this.endDate
    );

    this.shiftService
      .getShiftPunchings()
      .pipe(
        switchMap(shifts => {
          // console.log(shifts);
          this.shifts = shifts;
          return this.shiftRosterService.getShiftRoster(
            this.dateService.getDateYYYYMMDD(this.startDate),
            this.dateService.getDateYYYYMMDD(this.endDate)
          );
        })
      )
      .pipe(
        switchMap(rosters => {
          this.shiftRosters = rosters.map(roster => {
            roster.group_shifts.sort((a, b) => a.group_id - b.group_id); // sort by group id asc
            return roster;
          });
          console.log(this.shiftRosters);
          return this.groupService.getShiftGroups();
        })
      )
      .subscribe(groups => {
        this.groups = groups.sort((a, b) => a.id - b.id); // sort by group id asc
        console.log(this.groups);
        this.initForm();
      });
  }

  initForm() {
    let roster_arr = [];

    if (this.shiftRosters && this.shiftRosters.length > 0) {
      this.shiftRosters.forEach(roster => {
        let group_shifts = [];
        roster.group_shifts.forEach(groupShift => {
          group_shifts.push(
            this.fb.group({
              group_id: groupShift.group_id,
              shift_id: [groupShift.shift_id, Validators.required]
            })
          );
        });
        let formControl = this.fb.group({
          day: roster.day,
          group_shifts: this.fb.array(group_shifts)
        });
        roster_arr.push(formControl);
      });
    } else {
      this.dates.forEach(date => {
        let group_shifts = [];
        this.groups.forEach(group => {
          group_shifts.push(
            this.fb.group({
              group_id: group.id,
              shift_id: ["", Validators.required]
            })
          );
        });
        let formControl = this.fb.group({
          day: date,
          group_shifts: this.fb.array(group_shifts)
        });
        roster_arr.push(formControl);
      });
    }
    // console.log(roster_arr)
    this.rosterForm = this.fb.group({
      rosters: this.fb.array(roster_arr)
    });
  }

  createGroupShift(): FormGroup {
    return this.fb.group({
      group_id: "",
      shift_id: ""
    });
  }

  formatDate(date) {
    return this.dateService.formatDate(date);
  }

  saveRoster() {
    if (this.rosterForm.invalid) return;

    this.isSubmitting = true;
    this.shiftRosterService
      .addShiftRoster(this.rosterForm.get("rosters").value)
      .subscribe(
        () => {
          this.isSubmitting = false;
          this.snackbar.open(
            "Successfully saved the shift group roster",
            "Dismiss",
            {
              duration: 1600
            }
          );
        },
        () => (this.isSubmitting = false)
      );
  }

  get rosters(): FormArray {
    return this.rosterForm.get("rosters") as FormArray;
  }

  getDay(index: number) {
    const dateValue = this.rosters.controls[index].get("day").value;
    return this.formatDate(dateValue);
  }

  getGroupShifts(index: number) {
    return this.rosters.controls[index].get("group_shifts") as FormArray;
  }

  getShift(roster_index: number, gs_index: number) {
    let group_shifts = this.rosters.controls[roster_index].get(
      "group_shifts"
    ) as FormArray;
    return group_shifts.controls[gs_index].get("shift_id");
  }

  // initShift(day: Date, group_id: number) {
  //   if(!this.shiftRosters) return;
  //   this.shiftRosters.find(roster => {
  //     return roster.day == day &&
  //   })
  // }
}
