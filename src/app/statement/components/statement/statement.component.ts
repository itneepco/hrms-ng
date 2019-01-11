import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { NavObject } from '../../../shared/models/nav-object';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {

  navObj: NavObject[] = [
    { name: 'PF Statement', path: 'pf' },
    { name: 'Pension Statement', path: 'pension' },
    { name: 'Salary Statement', path: 'salary' },
  ];
  
  constructor(private auth: AuthService) {}

  ngOnInit() {
    if(this.auth.isAdmin() || this.auth.isTimeOfficeAdmin()) {
      this.navObj.push({ name: 'Approved Leaves', path: 'approved-leaves' })
    }
  }
}
