import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TrainingInfo } from '../../models/training';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.component.html',
  styleUrls: ['./my-training.component.scss']
})
export class MyTrainingComponent implements OnInit {
  dataSource: MatTableDataSource<TrainingInfo>
  errMsg: string
  isLoading = false
  
  // Pagination variables 
  dataLength = 0
  pageSize = 10
  pageIndex = 0

  constructor(public trainingService: TrainingService) { }

  ngOnInit() {
    this.getTrainingInfos()
  }

  getTrainingInfos() {
    this.isLoading = true
    this.trainingService.getMyTrainings(this.pageIndex, this.pageSize)
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
