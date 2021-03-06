import { NavObject } from '../../../shared/models/nav-object';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private auth: AuthService) {}

  nav: NavObject[] = [
    { name: 'Organogram', path: 'hierarchy' },
    { name: 'Holidays', path: 'holiday-list' },
    { name: 'Leave Ledger', path: 'leave-ledger' },
  ]

  ngOnInit() {
    if(this.auth.isSuperAdmin()) {
      this.nav.push({ name: 'Role Mapper', path: 'role-mapper' })
    }
    if(this.auth.isItAdmin()) {
      this.nav.push({ name: 'Leave Credit', path: 'leave-credit' })
    }
  }
}
