import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalaryStatementComponent } from './salary-statement/salary-statement.component';
import { StatementComponent } from './statement/statement.component';
import { AuthGuard } from '../auth/services/auth-guard';

const routes: Routes = [
  { 
    path: '', 
    component: StatementComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'salary', component: SalaryStatementComponent },
      { path: '', redirectTo: 'salary', pathMatch: 'full' }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementRoutingModule { }
