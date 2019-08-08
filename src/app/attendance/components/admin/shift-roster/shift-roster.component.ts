import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/attendance/models/group';
import { ShiftRoster } from 'src/app/attendance/models/shift-roster';
import { WageMonth } from 'src/app/attendance/models/wage-month';
import { DateService } from 'src/app/attendance/services/date.service';
import { ShiftRosterService } from 'src/app/attendance/services/shift-roster.service';
import { ShiftService } from 'src/app/attendance/services/shift.service';
import { WageMonthService } from 'src/app/attendance/services/wage-month.service';
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
  rosterForm: FormGroup;
  shiftRosters: ShiftRoster[];
  isSubmitting = false;
  activeWageMonth: WageMonth;
  startDate: Date;
  endDate: Date

  constructor(
    private shiftService: ShiftService,
    private groupService: GroupService,
    private fb: FormBuilder,
    private shiftRosterService: ShiftRosterService,
    private dateService: DateService,
    private snackbar: MatSnackBar,
    private wageMonthService: WageMonthService
  ) { }

  ngOnInit() {
    this.shiftService.getShiftPunchings()
      .subscribe(shifts => this.shifts = shifts)

    this.wageMonthService.getActiveWageMonth()
      .pipe(
        switchMap(wageMonth => {
          this.activeWageMonth = wageMonth
          console.log(wageMonth)
          if (!this.activeWageMonth) return [];

          this.startDate = this.activeWageMonth.from_date
          this.endDate = this.activeWageMonth.to_date

          this.enumerateDays();
          return this.groupService.getShiftGroups();
        })
      )
      .subscribe(groups => {
        this.groups = groups.sort((a, b) => a.id - b.id); // sort by group id asc
        // console.log("Groups", groups)
        this.fetchRosterAndInitForm();
      });
  }

  enumerateDays() {
    this.dates = this.dateService.enumerateDaysBetweenDates(this.startDate, this.endDate);
  }

  fetchRosterAndInitForm() {
    this.shiftRosterService.getShiftRoster(
      this.dateService.getDateYYYYMMDD(this.startDate),
      this.dateService.getDateYYYYMMDD(this.endDate)
    )
      .subscribe(rosters => {
        this.shiftRosters = rosters.map(roster => {
          roster.group_shifts.sort((a, b) => a.group_id - b.group_id); // sort by group id asc
          return roster;
        });
        this.initForm();
      })
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
        (data) => {
          this.shiftRosters = data
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

  generateEmpWiseRoster() {
    let fromDate = this.dateService.getDateYYYYMMDD(this.startDate)
    let toDate = this.dateService.getDateYYYYMMDD(this.endDate)

    this.shiftRosterService.generateEmpWiseRoster(fromDate, toDate)
      .subscribe(() => {
        this.snackbar.open(
          "Successfully generated shift employees roster",
          "Dismiss",
          {
            duration: 1600
          }
        );
      })
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

  nextWageMonth() {
    this.startDate = this.dateService.increaseDateByMonth(this.activeWageMonth.from_date, 1)
    this.endDate = this.dateService.increaseDateByMonth(this.activeWageMonth.to_date, 1)
    this.enumerateDays();
    this.fetchRosterAndInitForm();
  }

  currWageMonth() {
    this.startDate = this.activeWageMonth.from_date
    this.endDate = this.activeWageMonth.to_date
    this.enumerateDays();
    this.fetchRosterAndInitForm();
  }

  isActiveWageMonth() {
    return this.startDate === this.activeWageMonth.from_date
  }

  isActiveMonthDefined() {
    return typeof this.activeWageMonth  !== 'undefined'
  }
}
