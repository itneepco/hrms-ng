import { NavObject } from '../../../shared/model/nav-object';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  nav: NavObject[] = [
    { name: 'Hierarchy', path: 'hierarchy' },
    { name: 'Role Mapper', path: 'role-mapper' }
  ]
}
