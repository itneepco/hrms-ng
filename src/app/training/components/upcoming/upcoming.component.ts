import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { TrainingService } from '../../services/training.service';
import { AuthService } from './../../../auth/services/auth.service';
import { TrainingInfo } from './../../models/training';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  holiday_types = ["CH", "RH"]
  displayedColumns = ["position", "title", "venue", "from_date", "type", "actions"]
  dataSource: MatTableDataSource<TrainingInfo>
  errMsg: string
  isLoading = true

  // Pagination variables 
  dataLength = 0
  pageSize = 10
  pageIndex = 0

  constructor(public trainingService: TrainingService,
    public auth: AuthService,
    private router: Router,
    private dataService: DataService) { }

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
        }
      )
  }

  onEdit(training: TrainingInfo) {
    this.dataService.trainingData = training
    this.router.navigate(['training/new'])
  }

  // onRemove(holiday: Holiday) {
  //   let retVal = confirm("Are you sure you want to delete?")
  //   if(retVal == true) { 
  //     this.holidayService.deleteHoliday(holiday.id)
  //       .subscribe(() => {
  //         let index = this.dataSource.data.indexOf(holiday)
  //         let temp = this.dataSource.data
  //         temp.splice(index, 1)
  //         this.dataSource.data = temp
  //       })
      
  //     this.snackbar.open("Successfully deleted the holiday record", "Dismiss", {
  //       duration: 1600
  //     })  
  //   }
  // }

  changePage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.getTrainingInfos()
  }

}
