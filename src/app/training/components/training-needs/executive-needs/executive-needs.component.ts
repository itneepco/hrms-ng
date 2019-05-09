import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { ExecutiveNeedService } from '../../../services/executive-need.service';
import { AuthService } from './../../../../auth/services/auth.service';
import { ExecutiveNeed, TrainingNeedInfo } from './../../../models/training-needs';
import { ExecutiveNeedsFormComponent } from './executive-needs-form/executive-needs-form.component';

@Component({
  selector: 'app-executive-needs',
  templateUrl: './executive-needs.component.html',
  styleUrls: ['./executive-needs.component.scss']
})
export class ExecutiveNeedsComponent implements OnInit {
  needInfo: TrainingNeedInfo;
  displayedColumns = ['position', 'training_label', 'topic', 'need_type', 'duration', 'hod_remarks', 'actions'];
  dataSource: MatTableDataSource<ExecutiveNeed>;
  errMsg: string;
  isLoading = false;

  constructor(private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public executiveNeedService: ExecutiveNeedService) { }

  ngOnInit() {
    this.route.data.subscribe((routeData: TrainingNeedInfo) => {
      this.needInfo = routeData;
      console.log(this.needInfo)
      this.getExecutiveNeeds();
    });
  }

  addTrainingNeed() {
    const dialogRef = this.dialog.open(ExecutiveNeedsFormComponent, {
      width: '550px',
      height: '430px',
      data: { needInfo: this.needInfo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }

      console.log(result);
      const temp = this.dataSource.data;
      temp.unshift(result);
      this.dataSource.data = temp;
    });
  }

  onEdit(executiveNeed: ExecutiveNeed) {
    const dialogRef = this.dialog.open(ExecutiveNeedsFormComponent, {
      width: '550px',
      height: '430px',
      data: { year: this.needInfo, need: executiveNeed }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }

      const index = this.dataSource.data.indexOf(executiveNeed);
      const temp = this.dataSource.data;
      temp[index] = result;
      this.dataSource.data = temp;
    });
  }

  onDelete(executiveNeed: ExecutiveNeed) {
    const retVal = confirm('Are you sure you want to delete?');
    if (retVal !== true) { return; }

    this.executiveNeedService.deleteExecutiveNeed(executiveNeed.id)
      .subscribe(() => {
        const temp = this.dataSource.data;
        const index = temp.indexOf(executiveNeed);
        temp.splice(index, 1);
        this.dataSource.data = temp;
        this.snackbar.open('Successfully deleted the executiveNeed record', 'Dismiss', {
          duration: 1600
        });
      }, (error) => {
        console.log(error);
        this.snackbar.open('There was a problem deleting the record. Please try again', 'Dismiss', {
          duration: 2500
        });
      });
  }

  getExecutiveNeeds() {
    this.isLoading = true;
    this.executiveNeedService.getTrainigNeeds(
      this.needInfo.year,
      this.needInfo.emp_code
    )
    .subscribe(result => {
      this.dataSource = new MatTableDataSource<ExecutiveNeed>(result);
      this.isLoading = false;
      console.log(result);
    },
    errMsg => {
      this.errMsg = errMsg;
      this.isLoading = false;
    });
  }

  goBack() {
    this.router.navigate(['/training/needs']);
  }
}
