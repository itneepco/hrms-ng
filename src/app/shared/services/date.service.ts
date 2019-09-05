import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class DateService {
  constructor() {}

  enumerateDaysBetweenDates(startDate: Date, endDate: Date) {
    var dates = [];

    var currDate = moment(startDate).startOf("day");
    var lastDate = moment(endDate).startOf("day");

    dates.push(currDate.clone().toDate());

    while (currDate.add(1, "days").diff(lastDate) <= 0) {
      dates.push(currDate.clone().toDate());
    }

    return dates;
  }

  formatDate(date: Date) {
    return moment(date).format("dddd, Do MMMM, YYYY");
  }

  isSundaySaturday(date: Date) {
    const day = moment(date).day();
    return day === 0 || day === 6;
  }

  compareDates(first: Date, second: Date) {
    return moment(first).diff(moment(second), 'days') === 0
  }

  datesDiff(first: Date, second: Date) {
    return moment(first).diff(moment(second), 'days')
  }

  getDateYYYYMMDD(day: Date) {
    return moment(day).format("YYYY-MM-DD")
  }

  getDateDDMMMYYYY(day: Date) {
    return moment(day).format("DD MMM, YYYY")
  }

  increaseDateByMonth(day: Date, month: number) {
    return moment(day).add(month, 'month').toDate()
  }

  decreaseDateByMonth(day: Date, month: number) {
    return moment(day).subtract(month, 'month').toDate()
  }

  increaseByOneDay(date: Date | string, day: number) {
    return moment(date).add(day, 'day').toDate()
  }

  decreaseByOneDay(date: Date | string, day: number) {
    return moment(date).subtract(day, 'day').toDate()
  }
}
