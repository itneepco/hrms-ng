import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { switchMap } from "rxjs/operators";
import { Group } from "src/app/attendance/models/group";
import { Shift } from "src/app/attendance/models/shift";
import { DateService } from "src/app/attendance/services/date.service";
import { GroupService } from "src/app/attendance/services/group.service";

import { GeneralRoster } from "./../../../models/general-roster";
import { WorkingDay } from "./../../../models/working-day";
import { GeneralRosterService } from "./../../../services/general-roster.service";
import { ShiftService } from "./../../../services/shift.service";
import { WorkingDayService } from "./../../../services/working-day.service";
import { ChangeTimingComponent } from "./change-timing/change-timing.component";

@Component({
  selector: "app-gen-group-roster",
  templateUrl: "./gen-group-roster.component.html",
  styleUrls: ["./gen-group-roster.component.scss"]
})
export class GenGroupRosterComponent implements OnInit {
  startDate = new Date(2019, 5, 16);
  endDate = new Date(2019, 6, 15);
  weekends: Date[];
  workDays: WorkingDay[];
  genRosters: GeneralRoster[];
  genGroups: Group[];
  shifts: Shift[];

  constructor(
    private dateService: DateService,
    private locationService: Location,
    private genRosterService: GeneralRosterService,
    private workDayService: WorkingDayService,
    private groupService: GroupService,
    private shiftService: ShiftService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.weekends = this.dateService
      .enumerateDaysBetweenDates(this.startDate, this.endDate)
      .filter(date => this.dateService.isSundaySaturday(date));

    this.genRosterService
      .getGenRosters()
      .pipe(
        switchMap(genRosters => {
          this.genRosters = genRosters;
          return this.workDayService.getWorkingDays();
        })
      )
      .subscribe(workDays => (this.workDays = workDays));

    this.groupService
      .getGeneralGroups()
      .pipe(
        switchMap(groups => {
          this.genGroups = groups;
          return this.shiftService.getGeneralPunchings();
        })
      )
      .subscribe(shifts => (this.shifts = shifts));
  }

  formatDate(date: Date) {
    return this.dateService.formatDate(date);
  }

  goBack() {
    this.locationService.back();
  }

  markWorkDay(day: Date) {
    const data = { day } as WorkingDay;
    this.workDayService.addWorkingDay(data).subscribe(data => {
      this.workDays.push(data);
      this.workDays = [...this.workDays];
    });
  }

  unmarkWorkDay(workDay: WorkingDay) {
    this.workDayService.deleteWorkingDay(workDay.id).subscribe(() => {
      let index = this.workDays.findIndex(data => data == workDay);
      this.workDays.splice(index, 1);
      this.workDays = [...this.workDays];
    });
  }

  workingDay(day: Date) {
    return this.workDays.find(workDay =>
      this.dateService.compareDates(workDay.day, day)
    );
  }

  changeTiming(group: Group) {
    const roster = this.genRosters.find(roster => roster.group_id == group.id);
    const dialogRef = this.dialog.open(ChangeTimingComponent, {
      width: "400px",
      height: "250px",
      data: {
        group: group,
        roster: roster,
        shifts: this.shifts
      }
    });

    dialogRef.afterClosed().subscribe(newData => {
      if (!newData) return;

      // Fetch after successful update
      this.genRosterService
        .getGenRosters()
        .subscribe(rosters => (this.genRosters = rosters));

      this.snackbar.open(
        "Successfully changed punching timing for group " + group.name,
        "Dismiss",
        {
          duration: 1600
        }
      );
    });
  }

  getShiftName(group: Group) {
    const roster = this.genRosters.find(roster => roster.group_id == group.id);
    if (!roster) return "Not Defined";

    return this.shifts.find(shift => shift.id == roster.shift_id).name;
  }
}
