import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { WageMonthFormComponent } from '../admin/wage-month-form/wage-month-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openWageMonth() {
    this.dialog.open(WageMonthFormComponent, {
      width: '520px',
      height: '380px'
    });
  }

}
