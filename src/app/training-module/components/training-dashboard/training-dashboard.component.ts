import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';

import { TrainingCalendarService } from './../../services/training-calendar.service';

@Component({
  selector: 'app-training-dashboard',
  templateUrl: './training-dashboard.component.html',
  styleUrls: ['./training-dashboard.component.scss']
})
export class TrainingDashboardComponent implements OnInit {
  view = "month";
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen = false;

  constructor(private trainingCalendar: TrainingCalendarService) { }

  ngOnInit() {
    this.trainingCalendar.getAllTrainings().subscribe(events => {
      this.events = events;
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
}
