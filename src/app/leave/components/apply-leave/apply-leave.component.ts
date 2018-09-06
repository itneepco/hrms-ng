import { LeaveService } from '../../services/leave.service';
import { LeaveApplication } from '../../models/leave';
import { HierarchyService } from '../../../hierarchy/services/hierarchy.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

import { LedgerService } from '../../services/ledger.service';
import { LeaveStatus } from '../../models/leave';
import { AuthService } from '../../../auth/services/auth.service';
import { HolidayService } from '../../services/holiday.service';
import { LeaveMenuComponent } from '../leave-menu/leave-menu.component';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  view: string = 'month'
  viewDate: Date = new Date()
  events: CalendarEvent[] = []
  leaveForm: FormGroup
  leaveDays = [];
  refresh: Subject<any> = new Subject()
  leaveStatus: LeaveStatus = {} as LeaveStatus
  ctrlOfficers;

  constructor(private holidayService: HolidayService,
    private fb: FormBuilder,
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    private ledgerService: LedgerService,
    private leaveService: LeaveService,
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

    if (events.length > 0) {
      if (events.find(el => el.type == "CH")) return
      if (events.find(el => el.type == "RH") && events.length > 1) return
      if (events.filter(el => el.type != "CH" && el.type != "RH").length > 0) return
    }

    let bottomSheetRef = this.bottomSheet.open(LeaveMenuComponent, {
      data: {
        date: event.day.date,
        isRH: events.find(el => el.type == "RH") ? true : false,
        leaveStatus: this.leaveStatus
      }
    })

    bottomSheetRef.afterDismissed()
      .subscribe((data) => {
        if (!data) return

        //Substract 1 day from RH or CL
        if (data.type == "RH") this.leaveStatus.rh -= 1
        if (data.type == "CL") this.leaveStatus.cl -= 1

        // Create a calendar event
        let event = {
          title: "Applied for " + data.type,
          start: data.date,
          end: data.date,
          color: this.holidayService.colors.red,
        }

        this.events.push(event)
        this.leaveDays.push(Object.assign({ event: event }, data))
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

  removeLeave(leaveDay) {
    console.log(leaveDay)

    if (leaveDay.type == "RH") {
      this.leaveStatus.rh += 1
    }

    if (leaveDay.type == "CL") {
      this.leaveStatus.cl += 1
    }

    this.leaveDays.splice(leaveDay.id, 1)
    let index = this.events.indexOf(leaveDay.event)
    this.events.splice(index, 1)
    this.refresh.next()
  }

  applyLeave() {
    if (this.leaveForm.invalid || this.leaveDays.length < 1) return;

    let leaves = this.leaveDays.map(leaveDay => {
      return { 
        from_date: leaveDay.date, 
        to_date: leaveDay.date, 
        leave_type_id: leaveDay.type == "CL" ? 1 : 2 
      }
    })

    let leavApplication: LeaveApplication = Object.assign(this.leaveForm.value, 
      { leaveDays: leaves, emp_code: this.authService.currentUser.emp_code });
    
    this.leaveService.applyLeave(leavApplication).subscribe(result => { 
      if(result['status'] == 200) {
        
      }
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
