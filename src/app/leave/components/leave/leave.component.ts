import { NavObject } from '../../../shared/model/nav-object';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent  {
  nav: NavObject[] = [
    { name: 'Leave List', path: 'leave-list' },
    { name: 'Transactions', path: 'leave-transaction' },
    { name: 'Holidays', path: 'holiday-list' }
  ]
}
