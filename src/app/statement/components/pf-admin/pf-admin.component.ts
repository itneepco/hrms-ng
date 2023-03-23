import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import html2canvas from "html2canvas";
import * as jspdf from "jspdf";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { EmployeeService } from "src/app/shared/services/employee.service";
import { PfMonthlyData } from "../../models/monthly-data";
import { PfReport } from "../../models/pf-report";
import { PfReportService } from "../../services/pf-report.service";

@Component({
  selector: "app-pf-admin",
  templateUrl: "./pf-admin.component.html",
  styleUrls: ["./pf-admin.component.scss"],
})
export class PfAdminComponent implements OnInit {
  pfAdminForm: FormGroup;
  finYears: string[];
  searchResult = [];
  pfReport: PfReport;
  isLoading = false;
  errMsg: string;

  //Subscriptions
  empCodeSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private pfReportService: PfReportService
  ) {}

  ngOnInit() {
    this.finYears = this.getLast3FinYears();
    this.initializeForm();

    this.empCodeSubs = this.emp_code.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data) => {
        if (!data) {
          return;
        }
        if (data.length < 1) {
          return;
        }
        // console.log(data)
        this.employeeService.searchEmployee(data).subscribe((response) => {
          // console.log(response)
          this.searchResult = response;
        });
      });
  }

  initializeForm() {
    this.pfAdminForm = this.fb.group({
      emp_code: ["", [Validators.required]],
      fin_year: [this.getCurrFinYear(), [Validators.required]],
    });
  }

  onSubmit() {
    this.pfReportService
      .getStatement(this.emp_code.value, this.fin_year.value)
      .subscribe(
        (data) => {
          this.pfReport = data;
          this.isLoading = false;
        },
        (errMsg) => {
          this.errMsg = errMsg;
          this.isLoading = false;
        }
      );
  }

  private getLast3FinYears(): string[] {
    let date = new Date();
    let curr_fin_year = this.getCurrFinYear();
    let prev_fin_year1 = `${date.getFullYear() - 1}-${date.getFullYear()}`;
    let prev_fin_year2 = `${date.getFullYear() - 2}-${date.getFullYear() - 1}`;

    return [curr_fin_year, prev_fin_year1, prev_fin_year2];
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${item.designation}`;
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

  get emp_code() {
    return this.pfAdminForm.get("emp_code");
  }

  get fin_year() {
    return this.pfAdminForm.get("fin_year");
  }

  getTotalVpfCont(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach((data) => {
      total += data.voluntaryContribution;
    });
    return total;
  }

  getTotalEmpCont(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach((data) => {
      total += data.employeeContribution;
    });
    return total;
  }

  getTotalEmplCont(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach((data) => {
      total += data.employerContribution;
    });
    return total;
  }

  getTotalPensionAmt(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach((data) => {
      total += data.pensionAmount;
    });
    return total;
  }

  getTotalEmpWithdrawalTaxable(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach((data) => {
      total += data.employeeWithdrawalTaxable;
    });
    return total;
  }

  getTotalEmpWithdrawalNonTaxable(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach((data) => {
      total += data.empployeeWithdrawalNonTaxable;
    });
    return total;
  }

  getTotalEmplWithdrawal(): number {
    let total = 0;
    this.pfReport["monthlyData"].forEach((data) => {
      total += data.employerWithdrawal;
    });
    return total;
  }

  getBalanceAmount(): number {
    return (
      this.pfReport.summaryData.totalPf - this.pfReport.summaryData.tdsDeducted
    );
  }

  captureScreen() {
    let data = document.getElementById("contentToConvert");
    let date = new Date();
    let ddmmyyyy =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    html2canvas(data).then((canvas) => {
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

  ngOnDestroy() {
    this.empCodeSubs.unsubscribe();
  }
}
