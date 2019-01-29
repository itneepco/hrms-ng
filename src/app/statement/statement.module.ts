import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SalaryStatementComponent } from './components/salary-statement/salary-statement.component';
import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './components/statement/statement.component';
import { ApprovedLeavesComponent } from './components/approved-leaves/approved-leaves.component';
import { PfStatementComponent } from './components/pf-statement/pf-statement.component';
import { PensionStatementComponent } from './components/pension-statement/pension-statement.component';
import { ManageAttendanceComponent } from './components/manage-attendance/manage-attendance.component';
import { LeaveListComponent } from './components/leave-list/leave-list.component';

@NgModule({
  imports: [
    SharedModule,
    StatementRoutingModule
  ],
  declarations: [
    StatementComponent, 
    SalaryStatementComponent, 
    ApprovedLeavesComponent, 
    PfStatementComponent, PensionStatementComponent, ManageAttendanceComponent, LeaveListComponent
  ]
})
export class StatementModule { }
