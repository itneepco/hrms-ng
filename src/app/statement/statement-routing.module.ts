import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth-guard';
import { ApprovedLeavesComponent } from './components/approved-leaves/approved-leaves.component';
import { SalaryStatementComponent } from './components/salary-statement/salary-statement.component';
import { StatementComponent } from './components/statement/statement.component';
import { PfStatementComponent } from './components/pf-statement/pf-statement.component';

const routes: Routes = [
  { 
    path: '', 
    component: StatementComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'salary', component: SalaryStatementComponent },
      { path: 'approved-leaves', component: ApprovedLeavesComponent },
      { path: 'pf', component: PfStatementComponent },
      { path: '', redirectTo: 'salary', pathMatch: 'full' }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementRoutingModule { }
