import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { WageMonthFormComponent } from '../admin/wage-month-form/wage-month-form.component';
import { WageMonth } from '../../models/wage-month';
import { WageMonthService } from '../../services/wage-month.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeWageMonth: WageMonth;

  constructor(private dialog: MatDialog,
    private wageMonthService: WageMonthService) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => this.activeWageMonth = wageMonth)
  }

  openWageMonth() {
    this.dialog.open(WageMonthFormComponent, {
      width: '520px',
      height: '380px'
    });
  }

}
