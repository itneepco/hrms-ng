import { NavObject } from '../../../shared/model/nav-object';
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
    { name: 'Employee Hierarchy', path: 'hierarchy' }
  ]

  ngOnInit() {
    if(this.auth.isSuperAdmin()) {
      this.nav.push({ name: 'Role Mapper', path: 'role-mapper' })
    }
  }
}
