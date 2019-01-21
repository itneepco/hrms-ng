import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LeaveCreditService } from '../../services/leave-credit.service';

@Component({
  selector: 'app-leave-credit',
  templateUrl: './leave-credit.component.html',
  styleUrls: ['./leave-credit.component.scss']
})
export class LeaveCreditComponent {
  isLoading: boolean = false

  constructor(private leaveCredit: LeaveCreditService, private snackbar: MatSnackBar) { }

  creditAnnualCasualLeave() {
    this.isLoading = true
    
    this.leaveCredit.annualCasualLeaveCredit().subscribe(data => {
      this.isLoading = false
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    }, error => {
      this.isLoading = false
      console.log(error)
    })
  }

  creditAnnualRestrictedHoliday() {
    this.isLoading = true

    this.leaveCredit.annualRestrictedHolidayCredit().subscribe(data => {
      this.isLoading = false
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    }, error => {
      this.isLoading = false
      console.log(error)
    })
  }

  creditHalfYearlyEarnedLeave() {
    this.isLoading = true

    this.leaveCredit.halfYearlyEarnedLeaveCredit().subscribe(data => {
      this.isLoading = false
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    }, error => {
      this.isLoading = false
      console.log(error)
    })
  }

  creditHalfYearlyHalfPayLeave() {
    this.isLoading = true

    this.leaveCredit.halfYearlyHalfPayLeaveCredit().subscribe(data => {
      this.isLoading = false
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    }, error => {
      this.isLoading = false
      console.log(error)
    })
  }

  leaveYearEndProcessing() {
    this.isLoading = true

    this.leaveCredit.leaveYearEndProcessing().subscribe(data => {
      this.isLoading = false
      this.snackbar.open(data.message, "Dismiss", {
        duration: 2000
      })
    }, error => {
      this.isLoading = false
      console.log(error)
    })
  }
}
