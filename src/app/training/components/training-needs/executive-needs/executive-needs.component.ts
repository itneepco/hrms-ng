import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { ExecutiveNeedService } from '../../../services/executive-need.service';
import { AuthService } from './../../../../auth/services/auth.service';
import { ExecutiveNeed } from './../../../models/training-needs';
import { ExecutiveNeedsFormComponent } from './executive-needs-form/executive-needs-form.component';

@Component({
  selector: 'app-executive-needs',
  templateUrl: './executive-needs.component.html',
  styleUrls: ['./executive-needs.component.scss']
})
export class ExecutiveNeedsComponent implements OnInit {
  finYear = null  
  displayedColumns = ["position", "training_label", "topic", "need_type", "duration", "hod_remarks", "actions"]
  dataSource: MatTableDataSource<ExecutiveNeed>
  errMsg: string
  isLoading = false

  constructor(private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private route: ActivatedRoute,
    public executiveNeedService: ExecutiveNeedService) { }

  ngOnInit() {
    this.getExecutiveNeeds()
    this.finYear = this.route.snapshot.params.year
  }

  addTrainingNeed() {
    let dialogRef = this.dialog.open(ExecutiveNeedsFormComponent, {
      width: '550px',
      height: '430px',
      data: { year: this.finYear }
    })
    
    dialogRef.afterClosed().subscribe(result => {
      if(!result) return
      
      console.log(result)
      let temp = this.dataSource.data
      temp.unshift(result)
      this.dataSource.data = temp
    })
  }

  onEdit(executiveNeed: ExecutiveNeed) {
    let dialogRef = this.dialog.open(ExecutiveNeedsFormComponent, {
      width: '550px',
      height: '430px',
      data: { year: this.finYear, need: executiveNeed }
    })
    
    dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      let index = this.dataSource.data.indexOf(executiveNeed)
      let temp = this.dataSource.data
      temp[index] = result
      this.dataSource.data = temp
    })
  }

  onDelete(executiveNeed: ExecutiveNeed) {
    let retVal = confirm("Are you sure you want to delete?")
    if(retVal != true) return

    this.executiveNeedService.deleteExecutiveNeed(executiveNeed.id)
      .subscribe(() => {
        let temp = this.dataSource.data
        let index = temp.indexOf(executiveNeed)
        temp.splice(index, 1)
        this.dataSource.data = temp
        this.snackbar.open("Successfully deleted the executiveNeed record", "Dismiss", {
          duration: 1600
        }) 
      }, (error) => {
        console.log(error)
        this.snackbar.open("Cannot delete executiveNeed record. Its being referenced by other table", "Dismiss", {
          duration: 2500
        }) 
      })
  }

  getExecutiveNeeds() {
    this.isLoading = true
    this.executiveNeedService.getTrainigNeeds( 
      this.route.snapshot.params.year,
      this.auth.currentUser.emp_code
      )
      .subscribe(result => {
        this.dataSource = new MatTableDataSource<ExecutiveNeed>(result)
        this.isLoading = false
        console.log(result)
      },
      errMsg => {
        this.errMsg = errMsg
        this.isLoading = false
      })
  }
}
