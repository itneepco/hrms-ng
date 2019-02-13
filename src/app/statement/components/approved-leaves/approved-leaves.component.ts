import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

import { LeaveStatementService } from '../../services/leave-statement.service';
import { LeaveTypeService } from './../../../shared/services/leave-type.service';

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
  filteredDataSource: MatTableDataSource<any>

  constructor(private fb: FormBuilder,
    public leaveType: LeaveTypeService,
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
      mm_to = '0' + mm_to
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
        this.filteredDataSource = new MatTableDataSource(data.filter(leave => leave.time_office_status == false))
        
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
}
