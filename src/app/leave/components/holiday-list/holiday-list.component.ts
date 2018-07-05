import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HolidayService } from './../../services/holiday.service';
import { Holiday } from './../../shared/holiday';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {
  holiday_types = [ "CL", "RH" ]
  projects = [{id:1, name: "Shillong"}, {id: 2, name: "AGBP"}]
  displayedColumns = [ "name", "date", "type", "actions" ]
  holidays: Holiday[]
  errMsg: string
  isLoading = true
  holidayForm: FormGroup

  constructor(private holidayService: HolidayService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm()
    
    this.holidayService.getHolidays()
      .subscribe(holidays => {
        this.holidays = holidays
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
      holiday: ['', [Validators.required]],
      holiday_date: ['', [Validators.required]],
      holiday_type: ['', [Validators.required]],
      project: ['', [Validators.required]]
    })
  }

  onRemove(holiday: Holiday) {

  }

  get holiday() {
    return this.holidayForm.get('holiday')
  }
  get holiday_date() {
    return this.holidayForm.get('holiday_date')
  }
  get holiday_type() {
    return this.holidayForm.get('holiday_type')
  }
  get project(){
    return this.holidayForm.get('project')
  }
}
