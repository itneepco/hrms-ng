import { NavObject } from '../../../shared/model/nav-object';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent  {
  nav: NavObject[] = [
    { name: 'Transactions', path: 'leave-transaction' },
    { name: 'Apply Leave', path: 'leave-apply' },
    { name: 'Holidays', path: 'holiday-list' },
    { name: 'Ledger', path: 'leave-ledger' }
  ]
}
