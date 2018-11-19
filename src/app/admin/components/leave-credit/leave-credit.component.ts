import { Component } from '@angular/core';

import { LeaveCreditService } from '../../services/leave-credit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave-credit',
  templateUrl: './leave-credit.component.html',
  styleUrls: ['./leave-credit.component.scss']
})
export class LeaveCreditComponent {

  constructor(private leaveCredit: LeaveCreditService, private snackbar: MatSnackBar) { }

  creditAnnualCasualLeave() {
    this.leaveCredit.annualCasualLeaveCredit().subscribe(data => {
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    })
  }

  creditAnnualRestrictedHoliday() {
    this.leaveCredit.annualRestrictedHolidayCredit().subscribe(data => {
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    })
  }

  creditHalfYearlyEarnedLeave() {
    this.leaveCredit.halfYearlyEarnedLeaveCredit().subscribe(data => {
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    })
  }

  creditHalfYearlyHalfPayLeave() {
    this.leaveCredit.halfYearlyHalfPayLeaveCredit().subscribe(data => {
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    })
  }

  leaveYearEndProcessing() {
    this.leaveCredit.leaveYearEndProcessing().subscribe(data => {
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    })
  }
}
