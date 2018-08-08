import { HolidayService } from './../../services/holiday.service';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  view: string = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[];

  constructor(private holidayService: HolidayService) { }

  ngOnInit() {
    this.holidayService.getCalendarEvents()
      .subscribe(
        (events) => {
          this.events = events
          console.log(events)
        }
      )
  }

}
