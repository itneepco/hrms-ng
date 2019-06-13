import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EmployeeService } from '../../../shared/services/employee.service';
import { TrainingInfo } from '../../models/training';
import { TrainingService } from '../../services/training.service';
import { ExecutiveNeedService } from './../../services/executive-need.service';
import { NeedsInfoService } from './../../services/needs-info.service';

@Component({
  selector: 'app-training-profile',
  templateUrl: './training-profile.component.html',
  styleUrls: ['./training-profile.component.scss']
})
export class TrainingProfileComponent implements OnInit {
  dataSource: MatTableDataSource<TrainingInfo>;
  errMsg: string;
  isLoading = false;
  empCode: string;

  full_name: FormControl = new FormControl();
  empSearchResult = [];

  // Subscriptions
  fullNameSubs: Subscription;

  // Pagination variables
  dataLength = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private employeeService: EmployeeService,
    public trainingService: TrainingService,
    private trgNeedsInfoService: NeedsInfoService,
    private executiveNeedService: ExecutiveNeedService
  ) {}

  ngOnInit() {
    this.initEmployeeAutoComplete();
  }

  initEmployeeAutoComplete() {
    this.fullNameSubs = this.full_name.valueChanges
      .pipe(debounceTime(500))
      .subscribe(name => {
        if (!name) { return; }
        if (name.length < 1) { return; }

        this.employeeService
          .searchEmployeeByName(name)
          .subscribe(response => (this.empSearchResult = response));
      });
  }

  clearEmployeeSearch() {
    this.full_name.reset();
    this.empCode = null;
  }

  searchEmployee(event) {
    const full_info = event.source.viewValue.split(',');
    this.empCode = full_info[1].trim();
    this.getEmployeeTrainings();

  }

  getEmployeeTrainings() {
    if (!this.empCode) { return; }

    this.isLoading = true;
    this.trainingService
      .getEmployeeTrainings(this.pageIndex, this.pageSize, this.empCode)
      .subscribe(
        data => {
          this.dataLength = data['count'];
          this.dataSource = new MatTableDataSource<TrainingInfo>(data['rows']);
          this.isLoading = false;
          console.log(data);
        },
        errMsg => {
          this.errMsg = errMsg;
          this.isLoading = false;
        }
      );
  }

  getEmployeeTrgNeedsInfo() {

  }

  changePage(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getEmployeeTrainings();
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${
      item.emp_code
    }, ${item.designation}`;
  }
}
