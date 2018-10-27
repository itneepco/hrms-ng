import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LeaveStatementService } from '../../services/leave-statement.service';

@Component({
  selector: 'app-approved-leaves',
  templateUrl: './approved-leaves.component.html',
  styleUrls: ['./approved-leaves.component.scss']
})
export class ApprovedLeavesComponent implements OnInit {
  searchForm: FormGroup
  isLoading: boolean = false
  errMsg: string
  dataSource: MatTableDataSource<any>
  displayedColumns = ["position", "emp_code", "name", "actions"]

  constructor(private fb: FormBuilder,
    private leaveStatementService: LeaveStatementService) { }

  ngOnInit() {
    this.initForm()
  }

  fetchApprovedLeaves() {
    this.isLoading = true
    
    //Get from_date from form control
    let from_date = new Date(this.from_date.value)
    let mm_from = (from_date.getMonth()+1).toString()
    if((from_date.getMonth()+1) < 10) { 
      mm_from = '0' + mm_from
    }
    
    //Get to_date from form control
    let to_date = new Date(this.to_date.value)
    let mm_to = (to_date.getMonth()+1).toString() 
    if((to_date.getMonth()+1) < 10) { 
      mm_to = '0' + mm_from
    }

    //Format from_date in yyyy-mm-dd format
    let fd_format = `${from_date.getFullYear()}-${mm_from}-${from_date.getDate()}`
    
    //Format to_date in yyyy-mm-dd format
    let td_format = `${to_date.getFullYear()}-${mm_to}-${to_date.getDate()}`

    console.log(fd_format, td_format)
    
    this.leaveStatementService.getStatement(fd_format, td_format)
      .subscribe(data => {
        console.log(data) 
        this.dataSource = new MatTableDataSource(data)
        this.isLoading = false
      }, errMsg => {
        this.errMsg = errMsg
        this.isLoading = false
      }) 
  }

  initForm() {
    this.searchForm = this.fb.group({
      from_date: ['', Validators.required],
      to_date: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.searchForm.invalid) return
    this.fetchApprovedLeaves()
  }

  get from_date() {
    return this.searchForm.get('from_date')
  }

  get to_date() {
    return this.searchForm.get('to_date')
  }
}
