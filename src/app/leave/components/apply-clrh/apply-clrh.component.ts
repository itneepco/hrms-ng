import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HierarchyService } from '../../../admin/services/hierarchy.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CL_CODE, HD_CL_CODE } from '../../../shared/models/global-codes';
import { HolidayService } from '../../../shared/services/holiday.service';
import { LeaveTypeService } from '../../../shared/services/leave-type.service';
import { LeaveService } from '../../services/leave.service';
import { LedgerService } from '../../services/ledger.service';
import { LeaveMenuComponent } from '../leave-menu/leave-menu.component';
import { CALENDAR_COLORS } from './../../../shared/models/global-codes';
import { LeaveAppForm } from './../../models/leave-app-form';
import { LeaveStatus } from './../../models/leave-status';

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
  isLoading: boolean = false
  ctrlOfficers;

  constructor(private holidayService: HolidayService,
    private fb: FormBuilder,
    private auth: AuthService,
    private hierarchyService: HierarchyService,
    private ledgerService: LedgerService,
    private leaveService: LeaveService,
    private router: Router,
    private snackbar: MatSnackBar,
    private leaveTypeService: LeaveTypeService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.holidayService.getCalendarEvents()
      .pipe(
        switchMap(events => {
          this.events = events 
          return this.leaveService.getEmployeeLeaves(this.auth.currentUser.emp_code)
        })
      )
      .subscribe(data => {
        this.events = this.events.concat(data)
        // console.log(this.events)
      })  

    this.ledgerService.getLeaveStatus(this.auth.currentUser.emp_code)
      .subscribe((status: LeaveStatus[]) => {
        this.leaveStatuses = status
      })

    this.hierarchyService.getParents(this.auth.currentUser.emp_code)
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

        if(data.status.leave_code == HD_CL_CODE) {
          //If half day CL reduce the total balance of CL by 0.5
          let cl = this.leaveStatuses.find((status) => status.leave_code == CL_CODE)
          if(cl) {
            cl.balance -= 0.5
          }
        } 
        else {
          data.status.balance -= 1;  
        }

        // Create a calendar event
        let event = {
          title: "Applied for " + this.leaveTypeService.getLeaveType(data.status.leave_code),
          start: data.date,
          end: data.date,
          color: CALENDAR_COLORS.green,
        }

        this.events.push(event)
        //make station leave default value to false
        this.leaveDetails.push(Object.assign({ event: event, station_leave: false }, data))
        this.refresh.next()
      })
  }

  initializeForm() {
    this.leaveForm = this.fb.group({
      officer_emp_code: ['', Validators.required],
      purpose: ['', Validators.required],
      address: ['', Validators.required],
      contact_no: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      remarks: ''
    })
  }

  onToggle(event, index) {
    this.leaveDetails[index].station_leave = event.checked
  }

  removeLeave(leaveDetail, id: number) {
    if(leaveDetail.status.leave_code == HD_CL_CODE) {
      //If half day CL reduce the total balance of CL by 0.5
      let cl = this.leaveStatuses.find((status) => status.leave_code == CL_CODE)
      if(cl) {
        cl.balance += 0.5
      }
    } 
    else {
      leaveDetail.status.balance += 1;  
    }

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
      { leave_details: leaves, emp_code: this.auth.currentUser.emp_code });
    
    // console.log(leavApplication)
    this.isLoading = true
    this.leaveService.applyLeave(leavApplication).subscribe(result => { 
      console.log(result)
      this.isLoading = false
      this.router.navigateByUrl('leave/leave-transaction')
    }, 
    (responseError: HttpErrorResponse) => {
      console.log(responseError)
      this.isLoading = false
      if(responseError.status == 409) {
        let msg = responseError.error.message ? responseError.error.message : 
          "You have already applied for leave. Please check that you have not already applied for leave"
        this.snackbar.open(msg, "Dismiss", {
          duration: 2000
        }) 
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
