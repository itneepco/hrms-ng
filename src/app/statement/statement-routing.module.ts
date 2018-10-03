import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalaryStatementComponent } from './salary-statement/salary-statement.component';
import { StatementComponent } from './statement/statement.component';

const routes: Routes = [
  { 
    path: '', 
    component: StatementComponent,
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
