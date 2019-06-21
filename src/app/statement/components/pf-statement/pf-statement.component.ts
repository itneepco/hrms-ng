import { Component, OnInit } from "@angular/core";
import html2canvas from "html2canvas";
import * as jspdf from "jspdf";

import { AuthService } from "./../../../auth/services/auth.service";
import { PfMonthlyData } from "./../../models/monthly-data";
import { PfReportService } from "./../../services/pf-report.service";

@Component({
  selector: "app-pf-statement",
  templateUrl: "./pf-statement.component.html",
  styleUrls: ["./pf-statement.component.scss"]
})
export class PfStatementComponent implements OnInit {
  pfReport;
  finYears: string[];
  selectedFinYear: string;
  errMsg: string;
  isLoading = true;

  constructor(
    private pfReportService: PfReportService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.selectedFinYear = this.getCurrFinYear();
    this.finYears = this.getLast3FinYears();
    this.fetchPfReport();
  }

  fetchPfReport() {
    this.pfReportService
      .getStatement(this.auth.currentUser.emp_code, this.selectedFinYear)
      .subscribe(
        data => {
          console.log(data);
          let length = data.monthlyData.length;
          if (length < 12) {
            for (var i = length; i < 12; i++) {
              data.monthlyData.push(new PfMonthlyData());
            }
          }
          this.pfReport = data;
          this.isLoading = false;
        },
        errMsg => {
          this.errMsg = errMsg;
          this.isLoading = false;
        }
      );
  }

  onSelectionChange() {
    this.fetchPfReport();
  }

  getTotalVpfCont(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach(data => {
      total += data.volCont;
    });
    return total;
  }

  getTotalEmpCont(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach(data => {
      total += data.empCont;
    });
    return total;
  }

  getTotalEmplCont(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach(data => {
      total += data.emplCont;
    });
    return total;
  }

  getTotalPensionAmt(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach(data => {
      total += data.pensionAmt;
    });
    return total;
  }

  getTotalEmpWithdrawal(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach(data => {
      total += data.empWithdrawal;
    });
    return total;
  }

  getTotalEmplWithdrawal(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach(data => {
      total += data.emplWithdrawal;
    });
    return total;
  }

  captureScreen() {
    let data = document.getElementById("contentToConvert");
    let date = new Date();
    let ddmmyyyy =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 205;
      let pageHeight = 295;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      let position = 18;
      pdf.addImage(contentDataURL, "PNG", 2, position, imgWidth, imgHeight);
      pdf.save(`PF${ddmmyyyy}.pdf`); // Generated PDF
    });
  }

  private getLast3FinYears(): string[] {
    let date = new Date();
    let curr_fin_year = this.getCurrFinYear();
    let prev_fin_year1 = `${date.getFullYear() - 1}-${date.getFullYear()}`;
    let prev_fin_year2 = `${date.getFullYear() - 2}-${date.getFullYear() - 1}`;

    return [curr_fin_year, prev_fin_year1, prev_fin_year2];
  }

  private getCurrFinYear(): string {
    let date = new Date();
    let curr_fin_year;
    if (date.getMonth() < 3) {
      curr_fin_year = `${date.getFullYear() - 1}-${date.getFullYear()}`;
    } else {
      curr_fin_year = `${date.getFullYear()}-${date.getFullYear() + 1}`;
    }
    return curr_fin_year;
  }
}
