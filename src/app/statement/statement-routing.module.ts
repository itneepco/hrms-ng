import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../auth/services/admin-guard';
import { AuthGuard } from '../auth/services/auth-guard';
import { ApprovedLeavesComponent } from './components/approved-leaves/approved-leaves.component';
import { PensionStatementComponent } from './components/pension-statement/pension-statement.component';
import { PfStatementComponent } from './components/pf-statement/pf-statement.component';
import { SalaryStatementComponent } from './components/salary-statement/salary-statement.component';
import { StatementComponent } from './components/statement/statement.component';

const routes: Routes = [
  { 
    path: '', 
    component: StatementComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'salary', component: SalaryStatementComponent },
      { 
        path: 'approved-leaves', 
        component: ApprovedLeavesComponent,
        canActivate: [AdminGuard]  
      },
      { path: 'pf', component: PfStatementComponent },
      { path: 'pension', component: PensionStatementComponent },
      { path: '', redirectTo: 'salary', pathMatch: 'full' }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementRoutingModule { }
