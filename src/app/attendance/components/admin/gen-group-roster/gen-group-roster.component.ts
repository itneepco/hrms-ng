import { Holiday } from './../../../../shared/models/holiday';
import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/attendance/services/date.service';

import { HolidayService } from './../../../../shared/services/holiday.service';
import { Location } from '@angular/common';

@Component({
  selector: "app-gen-group-roster",
  templateUrl: "./gen-group-roster.component.html",
  styleUrls: ["./gen-group-roster.component.scss"]
})
export class GenGroupRosterComponent implements OnInit {
  startDate = new Date(2019, 5, 16);
  endDate = new Date(2019, 6, 15);
  dates: Date[];
  holidays: Holiday[] = [];

  constructor(
    private dateService: DateService,
    private holidayService: HolidayService,
    private locationService: Location
  ) {}

  ngOnInit() {
    this.dates = this.dateService.enumerateDaysBetweenDates(
      this.startDate,
      this.endDate
    );

    this.holidayService.getHolidaysBetween(this.startDate, this.endDate)
    .subscribe(data => {
      console.log(data)
      this.holidays = data
    })

    this.dateService.compareDates(new Date(), new Date())
  }

  formatDate(date: Date) {
    return this.dateService.formatDate(date)
  }

  isSundaySaturday(date: Date) {
    return this.dateService.isSundaySaturday(date)
  }

  markAsWorkingDay(date: Date) {

  }

  goBack() {
    this.locationService.back()
  }

  findHoliday(date: Date) {
    return this.holidays.find(holiday => {
      const holidayDate = new Date(holiday.day)
      return this.dateService.compareDates(date, holidayDate)
    })
  }
}
