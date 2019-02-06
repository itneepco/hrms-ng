import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ReportComponent } from './components/report/report.component';
import { TechnicalReportComponent } from './components/technical-report/technical-report.component';
import { UploadDailyReportComponent } from './components/upload-daily-report/upload-daily-report.component';
import { UploadMonthlyReportComponent } from './components/upload-monthly-report/upload-monthly-report.component';
import { UploadQuarterlyReportComponent } from './components/upload-quarterly-report/upload-quarterly-report.component';
import { UploadYearlyReportComponent } from './components/upload-yearly-report/upload-yearly-report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ReportRoutingModule
  ],
  declarations: [
    ReportComponent, 
    UploadDailyReportComponent, 
    UploadYearlyReportComponent, 
    UploadMonthlyReportComponent, 
    UploadQuarterlyReportComponent, 
    TechnicalReportComponent
  ]
})
export class ReportModule { }
