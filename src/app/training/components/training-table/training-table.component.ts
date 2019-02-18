import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { TrainingInfo } from '../../models/training';
import { DataService } from '../../services/data.service';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training-table',
  templateUrl: './training-table.component.html',
  styleUrls: ['./training-table.component.scss']
})
export class TrainingTableComponent implements OnInit {
  displayedColumns = []

  @Input('isAdminPage') isAdminPage: boolean
  @Input('dataSource') dataSource: MatTableDataSource<TrainingInfo>
  // Pagination variables 
  @Input('dataLength') dataLength
  @Input('pageSize') pageSize
  @Input('pageIndex') pageIndex  

  @Output() pageChange = new EventEmitter()

  constructor(private router: Router,
    public auth: AuthService, 
    public trainingService: TrainingService,
    private dataService: DataService) {}

  ngOnInit() {
    if(this.isAdminPage) {
      this.displayedColumns = ["position", "title", "type", "from_date", "status", "actions"]
    } else {
      this.displayedColumns = ["position", "title", "type", "from_date", "venue", "actions"]
    }
  }  

  changePage(pageEvent: PageEvent) {
    this.pageChange.emit(pageEvent)
  }

  onEdit(training: TrainingInfo) {
    this.dataService.trainingData = training
    this.router.navigate(['training/new'])
  }

  onShow() {
    console.log("On Show")
  }
}
