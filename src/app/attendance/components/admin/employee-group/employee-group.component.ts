import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeGroupFormComponent } from './employee-group-form/employee-group-form.component';

@Component({
  selector: 'app-employee-group',
  templateUrl: './employee-group.component.html',
  styleUrls: ['./employee-group.component.scss']
})
export class EmployeeGroupComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  addEmpToGroup() {
    this.dialog.open(EmployeeGroupFormComponent, {
      width: '520px',
      height: '320px'
    })
  }
}
