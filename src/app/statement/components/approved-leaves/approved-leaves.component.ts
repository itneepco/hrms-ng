import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

import { LeaveApplication, LeaveDetail } from '../../../shared/models/leave';
import { LeaveStatementService } from '../../services/leave-statement.service';
import { CL_CODE, EL_CODE, HD_CL_CODE, HPL_CODE, RH_CODE } from './../../../shared/models/global-codes';

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
  displayedColumns = ["position", "leave_app_id", "emp_code", "name", "leave_type", "from_date", "to_date"]

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

  captureScreen() {  
    let date = new Date()
    let ddmmyyyy = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() 
    var data = document.getElementById('approved-leaves');  
    html2canvas(data).then(canvas => {  
      var imgData = canvas.toDataURL('image/png');

      /*
      Here are the numbers (paper width and height) that I found to work. 
      It still creates a little overlap part between the pages, but good enough for me.
      if you can find an official number from jsPDF, use them.
      */
      var imgWidth = 210; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jspdf('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      doc.save(`${ddmmyyyy}.pdf`); // Generated PDF   
    });  
  } 

  get from_date() {
    return this.searchForm.get('from_date')
  }

  get to_date() {
    return this.searchForm.get('to_date')
  }

  getLeaveType(leaveApplication: LeaveApplication) {
    let el_type = leaveApplication.leaveDetails.find(leaveDetail => leaveDetail.leave_type == EL_CODE)
    if (el_type) return "EL"

    let hpl_type = leaveApplication.leaveDetails.find(leaveDetail => leaveDetail.leave_type == HPL_CODE)
    if (hpl_type) return "ML/HPL"

    let cl_rh_type = leaveApplication.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == CL_CODE || leaveDetail.leave_type == RH_CODE)
    if(cl_rh_type) return "CL/RH"
  }

  getSpecificLeaveType(leaveDetail: LeaveDetail) {
    if(leaveDetail.leave_type == CL_CODE) {
      return "CL"
    }
    if(leaveDetail.leave_type == RH_CODE) {
      return "RH"
    }
    if(leaveDetail.leave_type == HD_CL_CODE) {
      return "HD CL"
    }
  }

  isEarnedLeave(application: LeaveApplication): boolean {
    let el_type = application.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == EL_CODE)
    return el_type ? true : false  
  }

  isHalfPayLeave(application: LeaveApplication): boolean {
    let ml_type = application.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == HPL_CODE)
    return ml_type ? true : false  
  }

  isCasualLeave(application: LeaveApplication): boolean {
    let el_type = application.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == CL_CODE)
    return el_type ? true : false  
  }

  isRestrictedHoliday(application: LeaveApplication): boolean {
    let el_type = application.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == RH_CODE)
    return el_type ? true : false  
  }

  isHalfDayCl(application: LeaveApplication): boolean {
    let el_type = application.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == HD_CL_CODE)
    return el_type ? true : false  
  }
}
