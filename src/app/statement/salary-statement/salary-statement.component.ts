import { Component, OnInit } from '@angular/core';

import { SalaryStatementService } from '../services/salary-statement.service';
import { AuthService } from '../../auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salary-statement',
  templateUrl: './salary-statement.component.html',
  styleUrls: ['./salary-statement.component.scss']
})
export class SalaryStatementComponent implements OnInit {
  salary
  errMsg
  isLoading = false
  years = this.getLast2Years()
  months = [
    { name: "January", value: '01' },
    { name: "February", value: '02' },
    { name: "March", value: '03' },
    { name: "April", value: '04' },
    { name: "May", value: '05' },
    { name: "June", value: '06' },
    { name: "July", value: '07' },
    { name: "August", value: '08' },
    { name: "September", value: '09' },
    { name: "October", value: '10' },
    { name: "November", value: '11' },
    { name: "December", value: '12' }
  ]
  searchForm: FormGroup

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private salaryService: SalaryStatementService) { }

  ngOnInit() {
    this.fetchSalary() 
    this.initForm()  
  }

  fetchSalary(yymm?: string) {
    let empCode = this.auth.currentUser.emp_code
    this.isLoading = true
    this.salaryService.getStatement(empCode, yymm)
      .subscribe(data => {
        console.log(data) 
        this.salary = data
        this.isLoading = false
      }, errMsg => {
        this.errMsg = errMsg
        this.isLoading = false
      }) 
  }

  initForm() {
    this.searchForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.searchForm.invalid) return

    let yymm = this.year.value + this.month.value
    this.fetchSalary(yymm)
  }

  getLast2Years() {
    let date = new Date()
    return [ date.getFullYear(), date.getFullYear()-1 ]
  }

  getMonthYear(yymm: string) {
    let year = yymm.substr(0,4)
    let month = this.months.find(data => data.value == yymm.substr(4,2))

    let yymm_str = `${month.name}, ${year}`
    return yymm_str
  }

  getPayPeriod(yymm: string) {
    let month = this.months.find(data => data.value == yymm.substr(4,2))
    let index = this.months.findIndex(data => data.value == month.value)
    let prev_month = this.months[index-1]
    return `16 ${prev_month.name} - 15 ${month.name}`
  }

  get year() {
    return this.searchForm.get('year')
  }

  get month() {
    return this.searchForm.get('month')
  }
}