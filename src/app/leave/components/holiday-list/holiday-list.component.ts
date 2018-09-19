import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';

import { HolidayService } from '../../services/holiday.service';
import { Holiday } from '../../models/holiday';
import { Project } from './../../../shared/model/project.model';
import { ProjectService } from './../../../shared/services/project.service';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {
  holiday_types = ["CH", "RH"]
  projects: Project[]
  displayedColumns = ["position", "name", "date", "type", "actions"]
  dataSource: MatTableDataSource<Holiday>
  errMsg: string
  isLoading = true
  holidayForm: FormGroup
  _holiday: Holiday = {} as Holiday

  // Pagination variables 
  dataLength = 0
  pageSize = 10
  pageIndex = 0

  constructor(private holidayService: HolidayService,
    private projectService: ProjectService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm()
    this.getHolidays()
  }

  getHolidays() {
    this.projectService.getProjects()
      .pipe(
        switchMap((projects: Project[]) => { 
          this.projects = projects
          return this.holidayService.getHolidays(this.pageIndex, this.pageSize)
        })
      )
      .subscribe(data => {
          this.dataLength = data['count']
          this.dataSource = new MatTableDataSource<Holiday>(data['rows'])
          this.isLoading = false
        },
        errMsg => {
          this.errMsg = errMsg
          this.isLoading = false
        }
      )
  }

  initializeForm() {
    this.holidayForm = this.fb.group({
      name: [this._holiday.name, [Validators.required]],
      day: [this._holiday.day, [Validators.required]],
      type: [this._holiday.type, [Validators.required]],
      // project_id: [this._holiday.project_id, [Validators.required]]
    })
  }

  onSubmit() {
    let holidayFormValue = <Holiday> this.holidayForm.value
    console.log(this.holidayForm.value)

    if(this._holiday.id) {
      this.holidayService.editHoliday(this._holiday.id, holidayFormValue).subscribe(
        (holiday: Holiday) => {
          let index = this.dataSource.data.indexOf(this._holiday)
          let temp = this.dataSource.data
          temp.splice(index, 1)
          temp.unshift(holiday)
          this.dataSource.data = temp
          
          this._holiday = {} as Holiday
          this.snackbar.open("Successfully updated the holiday record", "Dismiss", {
            duration: 1600
          })
        }
      )
    }
    else {
      this.holidayService.addHoliday(holidayFormValue).subscribe(
        (holiday: Holiday) => {
          let temp = this.dataSource.data
          temp.splice(0, 0, holiday)
          this.dataSource.data = temp
          this.snackbar.open("Successfully created the holiday record", "Dismiss", {
            duration: 1600
          })
        }
      )
    }
    
    this.holidayForm.reset()
    Object.keys(this.holidayForm.controls).forEach((name) => {
      let control = this.holidayForm.controls[name];
      control.setErrors(null);
    });
  }

  onEdit(holiday: Holiday) {
    this._holiday = holiday
    this.initializeForm()
  }

  onRemove(holiday: Holiday) {
    let retVal = confirm("Are you sure you want to delete?")
    if(retVal == true) { 
      this.holidayService.deleteHoliday(holiday.id)
        .subscribe(() => {
          let index = this.dataSource.data.indexOf(holiday)
          let temp = this.dataSource.data
          temp.splice(index, 1)
          this.dataSource.data = temp
        })
      
        this.snackbar.open("Successfully deleted the holiday record", "Dismiss", {
        duration: 1600
      })  
    }
  }

  changePage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.getHolidays()
  } 

  get name() {
    return this.holidayForm.get('name')
  }
  get day() {
    return this.holidayForm.get('day')
  }
  get type() {
    return this.holidayForm.get('type')
  }
  get project_id() {
    return this.holidayForm.get('project_id')
  }
}
