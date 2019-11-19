import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { switchMap } from "rxjs/operators";
import { Group } from "src/app/attendance/models/group";
import { ShiftRoster } from "src/app/attendance/models/shift-roster";
import { WageMonth } from "src/app/attendance/models/wage-month";
import { ShiftRosterService } from "src/app/attendance/services/shift-roster.service";
import { ShiftService } from "src/app/attendance/services/shift.service";
import { WageMonthService } from "src/app/attendance/services/wage-month.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { DateService } from "src/app/shared/services/date.service";
import { Shift } from "../../../models/shift";
import { GroupService } from "../../../services/group.service";

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
  endDate: Date;
  isGenerating = false;
  isLoading = false;

  constructor(
    private shiftService: ShiftService,
    private groupService: GroupService,
    private fb: FormBuilder,
    private shiftRosterService: ShiftRosterService,
    private dateService: DateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private wageMonthService: WageMonthService
  ) {}

  ngOnInit() {
    this.shiftService
      .getShiftPunchings()
      .subscribe(shifts => (this.shifts = shifts));

    this.isLoading = true;  
    this.wageMonthService
      .getActiveWageMonth()
      .pipe(
        switchMap(wageMonth => {
          this.activeWageMonth = wageMonth;
          console.log(wageMonth);
          if (!this.activeWageMonth) return [];

          this.startDate = this.activeWageMonth.from_date;
          this.endDate = this.activeWageMonth.to_date;

          this.enumerateDays();
          return this.groupService.getShiftGroups();
        })
      )
      .subscribe(groups => {
        this.groups = groups.sort((a, b) => a.id - b.id); // sort by group id asc
        // console.log("Groups", groups)
        this.fetchRosterAndInitForm();
        this.isLoading = false
      }, () => this.isLoading = false);
  }

  enumerateDays() {
    this.dates = this.dateService.enumerateDaysBetweenDates(
      this.startDate,
      this.endDate
    );
  }

  fetchRosterAndInitForm() {
    this.shiftRosterService
      .getShiftRoster(
        this.dateService.getDateYYYYMMDD(this.startDate),
        this.dateService.getDateYYYYMMDD(this.endDate)
      )
      .subscribe(rosters => {
        this.shiftRosters = rosters.map(roster => {
          roster.group_shifts.sort((a, b) => a.group_id - b.group_id); // sort by group id asc
          return roster;
        });
        this.initForm();
      });
  }

  initForm() {
    let roster_arr = [];

    this.dates.forEach(date => {
      let group_shifts = [];
      this.groups.forEach(group => {
        if (this.shiftRosters && this.shiftRosters.length > 0) {
          let shift_id: any = "";

          // Find if roster is already defined for the current date
          const roster = this.shiftRosters.find(roster =>
            this.dateService.compareDates(roster.day, date)
          );
          
          // If roster exist, get group_shift corresponding to given group.id
          if (roster) {
            const groupShift = roster.group_shifts.find(
              groupShift => groupShift.group_id == group.id
            );
            shift_id = groupShift ? groupShift.shift_id : "";
          }

          // Push to group_shifts array
          group_shifts.push(
            this.fb.group({
              group_id: group.id,
              shift_id: [shift_id, Validators.required]
            })
          );
        }
        // Push to group_shifts array
        else {
          group_shifts.push(
            this.fb.group({
              group_id: group.id,
              shift_id: ["", Validators.required]
            })
          );
        }
      });
      let formControl = this.fb.group({
        day: date,
        group_shifts: this.fb.array(group_shifts)
      });
      roster_arr.push(formControl);
    });

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
        data => {
          this.shiftRosters = data;
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      height: "200px",
      data: {
        message: "Are you sure you want to generate employee wise roster?"
      }
    });

    dialogRef.afterClosed().subscribe(dialogData => {
      if (!dialogData) return;

      let fromDate = this.dateService.getDateYYYYMMDD(this.startDate);
      let toDate = this.dateService.getDateYYYYMMDD(this.endDate);

      this.isGenerating = true;
      this.shiftRosterService.generateEmpWiseRoster(fromDate, toDate).subscribe(
        () => {
          this.isGenerating = false;
          this.snackbar.open(
            "Successfully generated shift employees roster",
            "Dismiss",
            {
              duration: 1600
            }
          );
        },
        () => (this.isGenerating = false)
      );
    });
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
    this.startDate = this.dateService.increaseDateByMonth(
      this.activeWageMonth.from_date,
      1
    );
    this.endDate = this.dateService.increaseDateByMonth(
      this.activeWageMonth.to_date,
      1
    );
    this.enumerateDays();
    this.fetchRosterAndInitForm();
  }

  currWageMonth() {
    this.startDate = this.activeWageMonth.from_date;
    this.endDate = this.activeWageMonth.to_date;
    this.enumerateDays();
    this.fetchRosterAndInitForm();
  }

  isActiveWageMonth() {
    return this.startDate === this.activeWageMonth.from_date;
  }

  isActiveMonthDefined() {
    return (typeof this.activeWageMonth) !== "undefined";
  }
}
