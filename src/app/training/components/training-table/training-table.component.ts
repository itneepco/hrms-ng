import { FeedbackFormComponent } from './../feedback-form/feedback-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { TrainingInfo } from '../../models/training';
import { DataService } from '../../services/data.service';
import { TrainingService } from '../../services/training.service';
import { TrainingDetailComponent } from '../training-detail/training-detail.component';

@Component({
  selector: 'app-training-table',
  templateUrl: './training-table.component.html',
  styleUrls: ['./training-table.component.scss']
})
export class TrainingTableComponent implements OnInit {
  displayedColumns = []
  @Input('isAdminPage') isAdminPage: boolean = false
  @Input('isFeedbackPage') isFeedbackPage: boolean = false

  @Input('dataSource') dataSource: MatTableDataSource<TrainingInfo>
  
  // Pagination variables 
  @Input('dataLength') dataLength
  @Input('pageSize') pageSize
  @Input('pageIndex') pageIndex  

  @Output() pageChange = new EventEmitter()

  constructor(private router: Router,
    public auth: AuthService, 
    public dialog: MatDialog,
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

  onShow(training: TrainingInfo) {
    console.log("On Show")
    this.dialog.open(TrainingDetailComponent, { 
      panelClass: 'detail-dialog',
      width: '720px',
      height: '560px',
      data:  { 
        training: training,
        isAdminPage: this.isAdminPage 
      } 
    })
  }

  openFeedbackForm(training: TrainingInfo) {
    this.dialog.open(FeedbackFormComponent, {
      width: '550px',
      height: '450px'
    })
  }
}
