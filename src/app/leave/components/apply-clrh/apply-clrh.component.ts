import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CalendarEvent, CalendarView } from "angular-calendar";
import { Subject } from "rxjs";
import { switchMap } from "rxjs/operators";
import { CtrlOfficer } from "src/app/shared/models/adressee";
import { AuthService } from "../../../auth/services/auth.service";
import { CL_CODE, HD_CL_CODE } from "../../../shared/models/global-codes";
import { HierarchyService } from "../../../shared/services/hierarchy.service";
import { HolidayService } from "../../../shared/services/holiday.service";
import { LeaveTypeService } from "../../../shared/services/leave-type.service";
import { LeaveEvent } from "../../models/leave-event";
import { LeaveService } from "../../services/leave.service";
import { LedgerService } from "../../services/ledger.service";
import { LeaveMenuComponent } from "../leave-menu/leave-menu.component";
import { CALENDAR_COLORS } from "./../../../shared/models/global-codes";
import { LeaveAppForm } from "./../../models/leave-app-form";
import { LeaveRegister, LeaveStatus } from "./../../models/leave-status";

interface LeaveDetail extends LeaveEvent {
  event: CalendarEvent;
  station_leave: boolean;
}

@Component({
  selector: "app-apply-leave",
  templateUrl: "./apply-clrh.component.html",
  styleUrls: ["./apply-clrh.component.scss"]
})
export class ApplyCLRHComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  leaveForm: FormGroup;
  leaveDetails: LeaveDetail[] = [];
  refresh: Subject<any> = new Subject();
  leaveStatuses: LeaveStatus[] = [];
  prevYearRegister: LeaveRegister;
  currYearRegister: LeaveRegister;
  nextYearRegister: LeaveRegister;
  isSubmitting = false;
  isLoading = false;
  ctrlOfficers: CtrlOfficer[];

  constructor(
    private holidayService: HolidayService,
    private fb: FormBuilder,
    private auth: AuthService,
    private hierarchyService: HierarchyService,
    private ledgerService: LedgerService,
    private leaveService: LeaveService,
    private router: Router,
    private snackbar: MatSnackBar,
    private leaveTypeService: LeaveTypeService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.holidayService
      .getCalendarEvents()
      .pipe(
        switchMap(events => {
          this.events = events;
          return this.leaveService.getEmployeeLeaves(
            this.auth.currentUser.emp_code
          );
        })
      )
      .subscribe(data => (this.events = this.events.concat(data)));

    this.ledgerService
      .getCurrYearBal(this.auth.currentUser.emp_code)
      .subscribe((register: LeaveRegister) => {
        this.currYearRegister = register;
        this.leaveStatuses = register.status;
      });

    this.hierarchyService
      .getParents(this.auth.currentUser.emp_code)
      .subscribe(ctrlOfficers => {
        this.ctrlOfficers = ctrlOfficers;
      });

    this.initializeForm();
  }

  viewDateClick(event) {
    const viewDate = new Date(event);
    const viewYear = viewDate.getFullYear();

    if (viewYear == this.currYearRegister.year) {
      this.leaveStatuses = this.currYearRegister.status;
    }

    if (viewYear > this.currYearRegister.year) {
      this.isLoading = true;
      this.ledgerService
        .getNextYearBal(this.auth.currentUser.emp_code)
        .subscribe(
          (register: LeaveRegister) => {
            console.log(register);
            this.isLoading = false;
            this.leaveStatuses = register.status;
          },
          () => (this.isLoading = false)
        );
    }

    if (viewYear < this.currYearRegister.year) {
      this.isLoading = true;
      this.ledgerService
        .getPrevYearBal(this.auth.currentUser.emp_code)
        .subscribe(
          (register: LeaveRegister) => {
            console.log(register);
            this.isLoading = false;
            this.leaveStatuses = register.status;
          },
          () => (this.isLoading = false)
        );
    }
  }

  onDayClick(event) {
    const events = event.day.events;
    // Check if the date is CL or RH or if the date has been applied for leave
    if (events.length > 0) {
      // if (events.find(el => el.type == "CH")) return;

      if (events.find(el => el.type == "RH") && events.length > 1) {
        return;
      }
      // if leave has already been applied on a particular date
      if (events.filter(el => el.type != "CH" && el.type != "RH").length > 0) {
        return;
      }
    }

    const bottomSheetRef = this.bottomSheet.open(LeaveMenuComponent, {
      data: {
        date: event.day.date,
        isRH: events.find(el => el.type == "RH") ? true : false,
        leaveStatuses: this.leaveStatuses
      }
    });

    bottomSheetRef.afterDismissed().subscribe((leaveEvent: LeaveEvent) => {
      if (!leaveEvent) return;

      // Prevent dates from different years to be clubbed together in one leave application
      let leave = this.leaveDetails.length > 0 ? this.leaveDetails[0] : null;
      if (leave) {
        let year = new Date(leave.date).getFullYear();
        if (leaveEvent.date.getFullYear() != year) {
          this.snackbar.open(
            "You cannot apply two dates from different year in the same leave application",
            "Dismiss",
            { duration: 2000 }
          );
          return; // Return from the function
        }
      }

      if (leaveEvent.status.leave_code == HD_CL_CODE) {
        // If half day CL reduce the total balance of CL by 0.5
        const cl = this.leaveStatuses.find(
          status => status.leave_code == CL_CODE
        );
        if (cl) {
          cl.balance -= 0.5;
        }
      } else {
        leaveEvent.status.balance -= 1;
      }

      // Create a calendar event
      const event = {
        title:
          "Applied for " +
          this.leaveTypeService.getLeaveType(leaveEvent.status.leave_code),
        start: leaveEvent.date,
        end: leaveEvent.date,
        color: CALENDAR_COLORS.green
      };

      this.events.push(event);
      // make station leave default value to false
      this.leaveDetails.push(
        Object.assign({ event: event, station_leave: false }, leaveEvent)
      );
      this.refresh.next();
    });
  }

  // Initialize the leave application form
  initializeForm() {
    this.leaveForm = this.fb.group({
      officer_emp_code: ["", Validators.required],
      purpose: ["", Validators.required],
      address: ["", Validators.required],
      contact_no: ["", [Validators.required, Validators.pattern("[0-9]{10}")]],
      remarks: ""
    });
  }

  onToggle(event, index) {
    this.leaveDetails[index].station_leave = event.checked;
  }

  removeLeave(leaveDetail, id: number) {
    if (leaveDetail.status.leave_code == HD_CL_CODE) {
      // If half day CL reduce the total balance of CL by 0.5
      const cl = this.leaveStatuses.find(
        status => status.leave_code == CL_CODE
      );
      if (cl) {
        cl.balance += 0.5;
      }
    } else {
      leaveDetail.status.balance += 1;
    }

    this.leaveDetails.splice(id, 1);
    const index = this.events.indexOf(leaveDetail.event);
    this.events.splice(index, 1);
    this.refresh.next();
  }

  applyLeave() {
    if (this.leaveForm.invalid || this.leaveDetails.length < 1) {
      return;
    }

    const leaves = this.leaveDetails.map(leaveDetail => {
      return {
        from_date: leaveDetail.date,
        to_date: leaveDetail.date,
        leave_type: leaveDetail.status.leave_code,
        station_leave: leaveDetail.station_leave
      };
    });

    const leavApplication: LeaveAppForm = Object.assign(this.leaveForm.value, {
      leave_details: leaves,
      emp_code: this.auth.currentUser.emp_code
    });

    // console.log(leavApplication)
    this.isSubmitting = true;
    this.leaveService.applyLeave(leavApplication).subscribe(
      result => {
        console.log(result);
        this.router.navigateByUrl("leave/leave-transaction");
        this.isSubmitting = false;
      },
      (responseError: HttpErrorResponse) => {
        console.log(responseError);
        if (responseError.status == 409) {
          const msg = responseError.error.message
            ? responseError.error.message
            : "You have already applied for leave. Please check that you have not already applied for leave";
          this.snackbar.open(msg, "Dismiss", {
            duration: 2000
          });
        }
        this.isSubmitting = false;
      }
    );
  }

  // Getters for leave application form
  get officer_emp_code() {
    return this.leaveForm.get("officer_emp_code");
  }

  get purpose() {
    return this.leaveForm.get("purpose");
  }

  get contact_no() {
    return this.leaveForm.get("contact_no");
  }

  get address() {
    return this.leaveForm.get("address");
  }
}
