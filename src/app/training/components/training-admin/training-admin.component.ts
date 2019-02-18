import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TrainingInfo } from '../../models/training';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training-admin',
  templateUrl: './training-admin.component.html',
  styleUrls: ['./training-admin.component.scss']
})
export class TrainingAdminComponent implements OnInit {
  dataSource: MatTableDataSource<TrainingInfo>
  errMsg: string
  isLoading = true
  isAdminPage = true;

  // Pagination variables 
  dataLength = 0
  pageSize = 10
  pageIndex = 0

  constructor(public trainingService: TrainingService) { }

  ngOnInit() {
    this.getTrainingInfos()
  }

  getTrainingInfos() {
    this.trainingService.getTrainingInfos(this.pageIndex, this.pageSize)
    .subscribe(data => {
      this.dataLength = data['count']
      this.dataSource = new MatTableDataSource<TrainingInfo>(data['rows'])
      this.isLoading = false
      console.log(data)
    },
    errMsg => {
      this.errMsg = errMsg
      this.isLoading = false
    })
  }

  changePage(pageEvent: PageEvent) {
    console.log(pageEvent)
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.getTrainingInfos()
  }

}
