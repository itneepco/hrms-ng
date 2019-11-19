import { NgModule } from '@angular/core';

import { LoginComponent } from '../auth/components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ApplyCLRHComponent } from './components/apply-clrh/apply-clrh.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { JoiningReportComponent } from './components/joining-report/joining-report.component';
import { LeaveDashboardComponent } from './components/leave-dashboard/leave-dashboard.component';
import { LeaveDetailComponent } from './components/leave-detail/leave-detail.component';
import { LeaveMenuComponent } from './components/leave-menu/leave-menu.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { LeaveTableComponent } from './components/leave-table/leave-table.component';
import { LeaveTransactionComponent } from './components/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './components/leave/leave.component';
import { ProcessedRequestComponent } from './components/processed-request/processed-request.component';
import { LeaveRoutingModule } from './leave-routing.module';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [
    SharedModule,
    LeaveRoutingModule,
    CalendarModule
  ],
  declarations: [
    LeaveTransactionComponent,
    ApplyCLRHComponent,
    LoginComponent,
    LeaveMenuComponent,
    LeaveDetailComponent,
    LeaveRequestComponent,
    LeaveTableComponent,
    LeaveComponent,
    ProcessedRequestComponent,
    LeaveDashboardComponent,
    ApplyLeaveComponent,
    JoiningReportComponent,
  ],
  entryComponents: [
    LeaveMenuComponent,
    LeaveDetailComponent,
    JoiningReportComponent
  ]
})
export class LeaveModule { }
