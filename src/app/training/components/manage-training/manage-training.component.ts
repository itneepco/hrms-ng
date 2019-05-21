import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { TrainingInfo } from '../../models/training';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training-admin',
  templateUrl: './manage-training.component.html',
  styleUrls: ['./manage-training.component.scss']
})
export class ManageTrainingComponent implements OnInit {
  dataSource: MatTableDataSource<TrainingInfo>
  pastTraining: MatTableDataSource<TrainingInfo>
  errMsg: string
  isLoading = false

  // Pagination variables
  dataLength = 0
  pastTrainingLength = 0
  pageSize = 10
  pageIndex = 0

  constructor(public trainingService: TrainingService,
    public auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getTrainingInfos()
    this.getPastTrainings()
  }

  getTrainingInfos() {
    this.isLoading = true
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

  getPastTrainings() {
    this.isLoading = true
    this.trainingService.getPastTrainings(this.pageIndex, this.pageSize)
    .subscribe(data => {
      this.pastTrainingLength = data['count']
      this.pastTraining = new MatTableDataSource<TrainingInfo>(data['rows'])
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

  changePastTrainingPage(pageEvent: PageEvent) {
    console.log(pageEvent)
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.getPastTrainings()
  }

  addNewTraining() {
    this.router.navigate(['/training/new'])
  }
}
