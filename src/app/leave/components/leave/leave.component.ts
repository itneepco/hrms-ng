import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { NavObject } from '../../../shared/model/nav-object';
import { LeaveRequestService } from '../../services/leave-request.service';
import { PendingRequestService } from '../../services/pending-request.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit, OnDestroy {
  navObj: NavObject[] = [
    { name: 'Overview', path: 'dashboard' },
    { name: 'Transactions', path: 'leave-transaction' },
    { name: 'Pending Request', path: 'leave-request'},
    { name: 'Processed Request', path: 'processed-request' },
  ];

  pendingRequest: number = 0;
  subscription: Subscription;

  constructor(private leaveRequestService: LeaveRequestService,
      private authService: AuthService,
      private pendingReqService: PendingRequestService
    ) {}

  ngOnInit() {
    this.getPendingReqStatus()
    this.subscription = this.pendingReqService.pendingState.subscribe((data) => {
      this.getPendingReqStatus()
    })

    if(this.authService.isAdmin()) {
      this.navObj.push({ name: 'Holidays', path: 'holiday-list' })
      this.navObj.push({ name: 'Ledger', path: 'leave-ledger' })
    }
  }

  getPendingReqStatus() {
    this.leaveRequestService.getPendingRequestCount(this.authService.currentUser.emp_code)
    .subscribe((count: number) => {
      this.navObj[2] =  { name: 'Pending Request', path: 'leave-request', count: count ? count : 0 }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
