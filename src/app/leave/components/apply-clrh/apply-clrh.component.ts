import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { LeaveStatus } from '../../models/leave';
import { HolidayService } from '../../services/holiday.service';
import { LeaveService } from '../../services/leave.service';
import { LedgerService } from '../../services/ledger.service';
import { LeaveMenuComponent } from '../leave-menu/leave-menu.component';
import { LeaveAppForm } from '../../models/leave';
import { LeaveTypeService } from '../../services/leave-type.service';
import { HierarchyService } from '../../../admin/services/hierarchy.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-clrh.component.html',
  styleUrls: ['./apply-clrh.component.scss']
})
export class ApplyCLRHComponent implements OnInit {
  view: string = 'month'
  viewDate: Date = new Date()
  events: CalendarEvent[] = []
  leaveForm: FormGroup
  leaveDetails = [];
  refresh: Subject<any> = new Subject()
  leaveStatuses: LeaveStatus[] = []
  ctrlOfficers;

  constructor(private holidayService: HolidayService,
    private fb: FormBuilder,
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    private ledgerService: LedgerService,
    private leaveService: LeaveService,
    private router: Router,
    private leaveTypeService: LeaveTypeService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.holidayService.getCalendarEvents()
      .subscribe(events => this.events = events)

    this.ledgerService.getLeaveStatus(this.authService.currentUser.emp_code, '2018')
      .subscribe((status: LeaveStatus[]) => {
        this.leaveStatuses = status
      })

    this.hierarchyService.getParents(this.authService.currentUser.emp_code)
      .subscribe(ctrlOfficers => {
        this.ctrlOfficers = ctrlOfficers
      })

    this.initializeForm()
  }

  onDayClick(event) {
    let events = event.day.events
    // Check if the date is CL or RH or if the date has been applied for leave
    if (events.length > 0) {
      if (events.find(el => el.type == "CH")) return
      if (events.find(el => el.type == "RH") && events.length > 1) return
      if (events.filter(el => el.type != "CH" && el.type != "RH").length > 0) return
    }

    let bottomSheetRef = this.bottomSheet.open(LeaveMenuComponent, {
      data: {
        date: event.day.date,
        isRH: events.find(el => el.type == "RH") ? true : false,
        leaveStatuses: this.leaveStatuses
      }
    })

    bottomSheetRef.afterDismissed()
      .subscribe((data: { status: LeaveStatus, date: Date}) => {
        if (!data) return

        console.log(data)
        data.status.balance -= 1;  

        // Create a calendar event
        let event = {
          title: "Applied for " + this.leaveTypeService.getLeaveType(data.status.leave_code),
          start: data.date,
          end: data.date,
          color: this.holidayService.colors.red,
        }

        this.events.push(event)
        this.leaveDetails.push(Object.assign({ event: event, station_leave: false }, data))
        this.refresh.next()
      })
  }

  initializeForm() {
    this.leaveForm = this.fb.group({
      officer_emp_code: ['', Validators.required],
      purpose: ['', Validators.required],
      address: ['', Validators.required],
      contact_no: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    })
  }

  onToggle(event, index) {
    this.leaveDetails[index].station_leave = event.checked
  }

  removeLeave(leaveDetail, id: number) {
    leaveDetail.status.balance += 1
    this.leaveDetails.splice(id, 1)
    let index = this.events.indexOf(leaveDetail.event)
    this.events.splice(index, 1)
    this.refresh.next()
  }

  applyLeave() {
    if (this.leaveForm.invalid || this.leaveDetails.length < 1) return;

    let leaves = this.leaveDetails.map(leaveDetail => {
      return { 
        from_date: leaveDetail.date, 
        to_date: leaveDetail.date,
        leave_type: leaveDetail.status.leave_code,
        station_leave: leaveDetail.station_leave
      }
    })

    let leavApplication: LeaveAppForm = Object.assign(this.leaveForm.value, 
      { leave_details: leaves, emp_code: this.authService.currentUser.emp_code });
    
    console.log(leavApplication)
    this.leaveService.applyLeave(leavApplication).subscribe(result => { 
      console.log(result)
      this.router.navigateByUrl('leave/leave-transaction')
    })
  }

  get officer_emp_code() {
    return this.leaveForm.get('officer_emp_code')
  }
  
  get purpose() {
    return this.leaveForm.get('purpose')
  }

  get contact_no() {
    return this.leaveForm.get('contact_no')
  }

  get address() {
    return this.leaveForm.get('address')
  }
}
