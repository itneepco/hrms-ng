import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth-guard';
import { ReportComponent } from './components/report/report.component';
import { TechnicalReportComponent } from './components/technical-report/technical-report.component';

const routes: Routes = [
  { 
    path: '', 
    component: ReportComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'technical-report', component: TechnicalReportComponent },
      { path: '', redirectTo: 'technical-report', pathMatch: 'full' }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
