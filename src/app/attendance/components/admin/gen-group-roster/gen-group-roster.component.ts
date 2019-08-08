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
import { WageMonthService } from 'src/app/attendance/services/wage-month.service';
import { WageMonth } from 'src/app/attendance/models/wage-month';

@Component({
  selector: "app-gen-group-roster",
  templateUrl: "./gen-group-roster.component.html",
  styleUrls: ["./gen-group-roster.component.scss"]
})
export class GenGroupRosterComponent implements OnInit {
  weekends: Date[];
  workDays: WorkingDay[];
  genRosters: GeneralRoster[];
  genGroups: Group[];
  shifts: Shift[];
  activeWageMonth: WageMonth
  startDate: Date;
  endDate: Date;

  constructor(
    private dateService: DateService,
    private locationService: Location,
    private genRosterService: GeneralRosterService,
    private workDayService: WorkingDayService,
    private groupService: GroupService,
    private shiftService: ShiftService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private wageMonthService: WageMonthService,
  ) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      this.activeWageMonth = wageMonth
      if (!this.activeWageMonth) return

      this.startDate = this.activeWageMonth.from_date
      this.endDate = this.activeWageMonth.to_date
      this.enumerateDays()
    })

    this.genRosterService
      .getGenRosters()
      .pipe(
        switchMap(genRosters => {
          // console.log(genRosters);
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
      .subscribe(shifts => {
        // console.log(shifts);
        this.shifts = shifts;
      });
  }

  enumerateDays() {
    this.weekends = this.dateService
      .enumerateDaysBetweenDates(this.startDate, this.endDate)
      .filter(date => this.dateService.isSundaySaturday(date));
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

    const shift = this.shifts.find(shift => shift.id == roster.shift_id);
    return shift ? shift.name : "Not Defined";
  }

  genEmpWiseRoster() {
    let fromDate = this.dateService.getDateYYYYMMDD(this.startDate)
    let toDate = this.dateService.getDateYYYYMMDD(this.endDate)

    this.genRosterService.generateEmpWiseRoster(fromDate, toDate)
      .subscribe(() => {
        this.snackbar.open(
          `Successfully generated general roster from ${fromDate} to ${toDate}`,
          "Dismiss",
          {
            duration: 1600
          }
        );
      })
  }

  nextWageMonth() {
    this.startDate = this.dateService.increaseDateByMonth(this.activeWageMonth.from_date, 1)
    this.endDate = this.dateService.increaseDateByMonth(this.activeWageMonth.to_date, 1)
    this.enumerateDays();
  }

  currWageMonth() {
    this.startDate = this.activeWageMonth.from_date
    this.endDate = this.activeWageMonth.to_date
    this.enumerateDays()
  }

  isActiveWageMonth() {
    return this.startDate === this.activeWageMonth.from_date
  }

  isActiveMonthDefined() {
    return typeof this.activeWageMonth  !== 'undefined'
  }
}
