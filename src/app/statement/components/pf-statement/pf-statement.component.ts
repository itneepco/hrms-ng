import { MonthlyData } from './../../models/monthly-data';
import { PfReportService } from './../../services/pf-report.service';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-pf-statement',
  templateUrl: './pf-statement.component.html',
  styleUrls: ['./pf-statement.component.scss']
})
export class PfStatementComponent implements OnInit {
  pfReport

  constructor(private pfReportService: PfReportService) { }

  ngOnInit() {
    this.pfReportService.getStatement('006368', '2018-2019')
      .subscribe(data => {
        console.log(data)
        let length = data.monthlyData.length
        if(length < 12) {
          for(var i=length; i<12; i++) {
            data.monthlyData.push(new MonthlyData())
          }
        }
        this.pfReport = data
      })
  }

  getTotalVpfCont(): number {
    let total = 0;
    this.pfReport['monthlyData'].forEach(data => {
      total += data.volCont
    })
    return total;
  }

  getTotalEmpCont(): number {
    let total = 0;
    this.pfReport['monthlyData'].forEach(data => {
      total += data.empCont
    })
    return total;
  }

  getTotalEmplCont(): number {
    let total = 0;
    this.pfReport['monthlyData'].forEach(data => {
      total += data.emplCont
    })
    return total;
  }

  getTotalPensionAmt(): number {
    let total = 0;
    this.pfReport['monthlyData'].forEach(data => {
      total += data.pensionAmt
    })
    return total;
  }

  getTotalEmpWithdrawal(): number {
    let total = 0;
    this.pfReport['monthlyData'].forEach(data => {
      total += data.empWithdrawal
    })
    return total;
  }

  getTotalEmplWithdrawal(): number {
    let total = 0;
    this.pfReport['monthlyData'].forEach(data => {
      total += data.emplWithdrawal
    })
    return total;
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
      pdf.save(`PF${ddmmyyyy}.pdf`); // Generated PDF   
    });  
  }  
}
