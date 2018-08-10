import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LeaveMenuComponent } from './../leave-menu/leave-menu.component';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

import { HolidayService } from './../../services/holiday.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  view: string = 'month'
  viewDate: Date = new Date()
  events: CalendarEvent[] = []
  leaveForm: FormGroup
  leaveDays = []
  refresh: Subject<any> = new Subject();

  constructor(private holidayService: HolidayService, 
    private fb: FormBuilder,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.holidayService.getCalendarEvents()
      .subscribe(events => this.events = events)
    
    this.initializeForm()  
  }

  onDayClick(event) {
    console.log(event)
    if(event.day.events.length > 0) return 

    let bottomSheetRef = this.bottomSheet.open(LeaveMenuComponent, {
      data: { date : event.day.date }
    })

    bottomSheetRef.afterDismissed()
      .subscribe((data) => {
        if(!data) return 
    
        let event = {
          title: "Applied for " + data.type,
          start: data.date,
          end: data.date,
          color: this.holidayService.colors.red
        }

        this.events.push(event)
        this.leaveDays.push(Object.assign({event: event}, data))
        this.refresh.next()
      })
  }

  initializeForm() {
    this.leaveForm = this.fb.group({
      reason: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  removeLeave(leaveDay) {
    this.leaveDays.splice(leaveDay.id, 1)
    let index = this.events.indexOf(leaveDay.event)
    this.events.splice(index, 1)
    this.refresh.next()
  }
}
