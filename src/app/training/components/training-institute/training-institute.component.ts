import { TrainingInstituteFormComponent } from './../training-institute-form/training-institute-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TrainingInstitute } from './../../models/training';
import { TrainingInstituteService } from './../../services/training-institute.service';

@Component({
  selector: 'app-training-institute',
  templateUrl: './training-institute.component.html',
  styleUrls: ['./training-institute.component.scss']
})
export class TrainingInstituteComponent implements OnInit {
  dataSource: MatTableDataSource<TrainingInstitute>
  errMsg: string
  isLoading = false
  
  // Pagination variables 
  dataLength = 0
  pageSize = 10
  pageIndex = 0

  displayedColumns = ["position", "name", "address", "website", "contact", "actions"]
  
  constructor(private instituteService: TrainingInstituteService, 
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getTrainingInstitutes()
  }

  addNewInstitute() {
    let dialogRef = this.dialog.open(TrainingInstituteFormComponent, {
      width: '550px',
      height: '430px'
    })
    
    dialogRef.afterClosed().subscribe(result => {
      if(!result) return
      
      let temp = this.dataSource.data
      temp.unshift(result)
      this.dataSource.data = temp
    })
  }

  onEdit(institute: TrainingInstitute) {
    let dialogRef = this.dialog.open(TrainingInstituteFormComponent, {
      width: '550px',
      height: '430px',
      data: institute
    })
    
    dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      let index = this.dataSource.data.indexOf(institute)
      let temp = this.dataSource.data
      temp[index] = result
      this.dataSource.data = temp
    })
  }

  getTrainingInstitutes() {
    this.isLoading = true
    this.instituteService.getInstitutesPaginate(this.pageIndex, this.pageSize)
      .subscribe(data => {
        this.dataLength = data['count']
        this.dataSource = new MatTableDataSource<TrainingInstitute>(data['rows'])
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
    this.getTrainingInstitutes()
  }
}
