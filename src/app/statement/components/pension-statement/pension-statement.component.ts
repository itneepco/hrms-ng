import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

import { AuthService } from '../../../auth/services/auth.service';
import { MonthlyData } from '../../models/monthly-data';
import { PensionReportService } from './../../services/pension-report.service';

@Component({
  selector: 'app-pension-statement',
  templateUrl: './pension-statement.component.html',
  styleUrls: ['./pension-statement.component.scss']
})
export class PensionStatementComponent implements OnInit {
  pension;
  finYears: string[];
  selectedFinYear: string;

  constructor(private pensionService: PensionReportService, private auth: AuthService) { }

  ngOnInit() {
    this.selectedFinYear = this.getCurrFinYear()
    this.finYears = this.getLast3FinYears()  
    this.fetchPfReport()
  }

  fetchPfReport() {
    this.pensionService.getStatement(this.auth.currentUser.emp_code, this.selectedFinYear)
      .subscribe(data => {
        console.log(data)
        let length = data.monthlyData.length
        if(length < 12) {
          for(var i=length; i<12; i++) {
            data.monthlyData.push(new MonthlyData())
          }
        }
        this.pension = data
      })
  }

  getCurrentYear() {
    return (new Date()).getFullYear()
  }

  onSelectionChange() {
    this.fetchPfReport()
  }

  getTotalVpfCont(): number {
    let total = 0;
    this.pension['monthlyData'].forEach(data => {
      total += data.volCont
    })
    return total;
  }

  getTotalEmpCont(): number {
    let total = 0;
    this.pension['monthlyData'].forEach(data => {
      total += data.empCont
    })
    return total;
  }

  getTotalEmplCont(): number {
    let total = 0;
    this.pension['monthlyData'].forEach(data => {
      total += data.emplCont
    })
    return total;
  }

  getTotalEmpArrear(): number {
    let total = 0;
    this.pension['monthlyData'].forEach(data => {
      total += data.empArrear
    })
    return total;
  }

  getTotalEmplArrear(): number {
    let total = 0;
    this.pension['monthlyData'].forEach(data => {
      total += data.emplArrear
    })
    return total;
  }

  getTotalPension() {
    return this.pension.summaryData.empClosingBal + this.pension.summaryData.emplClosingBal
  }

  captureScreen() {  
    var data = document.getElementById('contentToConvert'); 
    let date = new Date()
    let ddmmyyyy = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() 

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
      pdf.save(`NEDCSS${ddmmyyyy}.pdf`); // Generated PDF   
    });  
  }  

  private getLast3FinYears(): string[] {
    let date = new Date()
    let curr_fin_year = this.getCurrFinYear()
    let prev_fin_year1 = `${date.getFullYear()-1}-${date.getFullYear()}`
    let prev_fin_year2 = `${date.getFullYear()-2}-${date.getFullYear()-1}`

    return [ curr_fin_year, prev_fin_year1, prev_fin_year2 ]
  }

  private getCurrFinYear(): string {
    let date = new Date()
    let curr_fin_year;
    if(date.getMonth() < 3) {
      curr_fin_year = `${date.getFullYear()-1}-${date.getFullYear()}`
    } else {
      curr_fin_year = `${date.getFullYear()}-${date.getFullYear()+1}`
    }
    return curr_fin_year;
  }

}
