import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SalaryStatementComponent } from './salary-statement/salary-statement.component';
import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement/statement.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';

@NgModule({
  imports: [
    SharedModule,
    StatementRoutingModule
  ],
  declarations: [StatementComponent, SalaryStatementComponent, ApprovedLeavesComponent]
})
export class StatementModule { }
