import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { TrainingInfo } from '../../models/training';
import { DataService } from '../../services/data.service';
import { TrainingService } from '../../services/training.service';
import { TrainingDetailComponent } from './training-detail/training-detail.component';
import { FeedbackFormComponent } from '../feedback/feedback-form/feedback-form.component';

@Component({
  selector: 'app-training-table',
  templateUrl: './training-table.component.html',
  styleUrls: ['./training-table.component.scss']
})
export class TrainingTableComponent implements OnInit {
  displayedColumns = [];
  @Input('isAdminPage') isAdminPage = false;
  @Input('isFeedbackPage') isFeedbackPage = false;
  @Input('isProfilePage') isProfilePage = false;
  @Input('title') title = null;

  @Input('dataSource') dataSource: MatTableDataSource<TrainingInfo>;

  // Pagination variables
  @Input('dataLength') dataLength;
  @Input('pageSize') pageSize;
  @Input('pageIndex') pageIndex;

  @Output() pageChange = new EventEmitter();

  constructor(private router: Router,
    public auth: AuthService,
    public dialog: MatDialog,
    public trainingService: TrainingService,
    private dataService: DataService) {}

  ngOnInit() {
    if (this.isAdminPage) {
      this.displayedColumns = ['position', 'title', 'type', 'from_date', 'status', 'actions'];
    } else {
      this.displayedColumns = ['position', 'title', 'type', 'from_date', 'venue', 'actions'];
    }
  }

  changePage(pageEvent: PageEvent) {
    this.pageChange.emit(pageEvent);
  }

  onEdit(training: TrainingInfo) {
    this.dataService.trainingData = training;
    this.router.navigate(['/training/admin-training/new']);
  }

  onShow(training: TrainingInfo) {
    console.log('On Show');
    this.dialog.open(TrainingDetailComponent, {
      panelClass: 'detail-dialog',
      width: '680px',
      height: '580px',
      data:  {
        training: training,
        isAdminPage: this.isAdminPage,
        isProfilePage: this.isProfilePage
      }
    });
  }

  openFeedbackForm(training: TrainingInfo) {
    this.dialog.open(FeedbackFormComponent, {
      width: '650px',
      height: '580px',
      data:  training
    });
  }
}
