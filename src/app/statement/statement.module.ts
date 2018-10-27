import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SalaryStatementComponent } from './components/salary-statement/salary-statement.component';
import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './components/statement/statement.component';
import { ApprovedLeavesComponent } from './components/approved-leaves/approved-leaves.component';
import { PfStatementComponent } from './components/pf-statement/pf-statement.component';

@NgModule({
  imports: [
    SharedModule,
    StatementRoutingModule
  ],
  declarations: [
    StatementComponent, 
    SalaryStatementComponent, 
    ApprovedLeavesComponent, 
    PfStatementComponent
  ]
})
export class StatementModule { }
