import { HierarchyService } from './../../../hierarchy/services/hierarchy.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

import { LedgerService } from '../../services/ledger.service';
import { LeaveStatus } from '../../shared/leave';
import { AuthService } from './../../../auth/services/auth.service';
import { HolidayService } from './../../services/holiday.service';
import { LeaveMenuComponent } from './../leave-menu/leave-menu.component';

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
  refresh: Subject<any> = new Subject()
  leaveStatus: LeaveStatus = {} as LeaveStatus
  ctrlOfficers;

  constructor(private holidayService: HolidayService, 
    private fb: FormBuilder,
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    private ledgerService: LedgerService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.holidayService.getCalendarEvents()
      .subscribe(events => this.events = events)
    
    this.ledgerService.getLeaveStatus(this.authService.currentUser.emp_code, '2018')
      .subscribe((status: LeaveStatus) => { 
        this.leaveStatus = status 
      })  

    this.hierarchyService.getParents(this.authService.currentUser.emp_code)
      .subscribe(ctrlOfficers => {
        this.ctrlOfficers = ctrlOfficers
      })  
      
    this.initializeForm()  
  }

  onDayClick(event) {
    let events = event.day.events

    if(events.length > 0) { 
      if(events.find(el => el.type == "CH")) return
      if(events.find(el => el.type == "RH") && events.length > 1) return
      if(events.filter(el => el.type != "CH" && el.type != "RH").length > 0) return
    } 

    let bottomSheetRef = this.bottomSheet.open(LeaveMenuComponent, {
      data: { 
        date : event.day.date,
        isRH: events.find(el => el.type == "RH") ? true : false,
        leaveStatus: this.leaveStatus
      }
    })

    bottomSheetRef.afterDismissed()
      .subscribe((data) => {
        if(!data) return 
        
        if(data.type == "RH") this.leaveStatus.rh -= 1
        if(data.type == "CL") this.leaveStatus.cl -= 1

        let event = {
          title: "Applied for " + data.type,
          start: data.date,
          end: data.date,
          color: this.holidayService.colors.red,
        }

        this.events.push(event)
        this.leaveDays.push(Object.assign({event: event}, data))
        this.refresh.next()
      })
  }

  initializeForm() {
    this.leaveForm = this.fb.group({
      authoriser_emp_code: ['', Validators.required],
      reason: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required]
    })
  }

  removeLeave(leaveDay) {
    console.log(leaveDay)
    
    if(leaveDay.type == "RH") {
      this.leaveStatus.rh += 1
    }

    if(leaveDay.type == "CL") {
      this.leaveStatus.cl += 1
    }

    this.leaveDays.splice(leaveDay.id, 1)
    let index = this.events.indexOf(leaveDay.event)
    this.events.splice(index, 1)
    this.refresh.next()
  }
}
