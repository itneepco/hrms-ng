import { Shift } from 'src/app/attendance/models/shift';
import { ShiftService } from './../../../services/shift.service';
import { GroupService } from 'src/app/attendance/services/group.service';
import { Group } from 'src/app/attendance/models/group';
import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { switchMap } from "rxjs/operators";
import { DateService } from "src/app/attendance/services/date.service";

import { Holiday } from "./../../../../shared/models/holiday";
import { GeneralRoster } from "./../../../models/general-roster";
import { WorkingDay } from "./../../../models/working-day";
import { GeneralRosterService } from "./../../../services/general-roster.service";
import { WorkingDayService } from "./../../../services/working-day.service";

@Component({
  selector: "app-gen-group-roster",
  templateUrl: "./gen-group-roster.component.html",
  styleUrls: ["./gen-group-roster.component.scss"]
})
export class GenGroupRosterComponent implements OnInit {
  startDate = new Date(2019, 5, 16);
  endDate = new Date(2019, 6, 15);
  weekends: Date[];
  holidays: Holiday[] = [];
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
          console.log(genRosters)
          return this.workDayService.getWorkingDays();
        })
      )
      .subscribe(workDays => (this.workDays = workDays));

    this.groupService.getGeneralGroups()
    .pipe(
      switchMap(groups => {
        this.genGroups = groups
        return this.shiftService.getShifts()
      })
    )
    .subscribe(shifts => this.shifts = shifts)
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

  changeTiming() {

  }
}
