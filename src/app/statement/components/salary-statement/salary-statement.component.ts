import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

import { AuthService } from '../../../auth/services/auth.service';
import { SalaryStatementService } from '../../services/salary-statement.service';

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

  captureScreen() {  
    var data = document.getElementById('salary-info');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(`${this.salary.yymm}.pdf`); // Generated PDF   
    });  
  } 

  getLast2Years() {
    let date = new Date()
    return [ date.getFullYear(), date.getFullYear()-1 ]
  }

  getMonthYear(yymm: string) {
    let year = yymm.substr(0,4)
    let mnth = this.months.find(data => data.value == yymm.substr(4,2))
    let yymm_str = `${mnth.name}, ${year}`
    return yymm_str
  }

  getPayPeriod(yymm: string) {
    let curr_month = this.months.find(data => data.value == yymm.substr(4,2))
    let curr_index = this.months.findIndex(data => data.value == curr_month.value)
    let prev_index = curr_index === 0 ? 11 : curr_index - 1
    let prev_month = this.months[prev_index]
    return `16 ${prev_month.name} - 15 ${curr_month.name}`
  }

  get year() {
    return this.searchForm.get('year')
  }

  get month() {
    return this.searchForm.get('month')
  }
}