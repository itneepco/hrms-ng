import { NavObject } from '../../../shared/model/nav-object';
import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../../services/leave-request.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  navObj: NavObject[] = [
    { name: 'Overview', path: 'leave-dashboard' },
    { name: 'Transactions', path: 'leave-transaction' },
    { name: 'Pending Request', path: 'leave-request'},
    { name: 'Processed Request', path: 'processed-request' },
    { name: 'Holidays', path: 'holiday-list' },
    { name: 'Ledger', path: 'leave-ledger' }
  ];

  pendingRequest: number = 0;

  constructor(private leaveRequestService: LeaveRequestService,
      private authService: AuthService
    ) {}

  ngOnInit() {
    this.leaveRequestService.getPendingRequestCount(this.authService.currentUser.emp_code)
      .subscribe((count: number) => {
        this.navObj[2] =  { name: 'Pending Request', path: 'leave-request', count: count ? count : 0 }
      })
  }
}
