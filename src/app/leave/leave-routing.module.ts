import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveComponent } from './components/leave/leave.component';
import { LeaveDashboardComponent } from './components/leave-dashboard/leave-dashboard.component';
import { LeaveTransactionComponent } from './components/leave-transaction/leave-transaction.component';
import { ApplyCLRHComponent } from './components/apply-clrh/apply-clrh.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { ProcessedRequestComponent } from './components/processed-request/processed-request.component';
import { AuthGuard } from '../auth/services/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: LeaveComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: LeaveDashboardComponent },
      { path: 'leave-transaction', component: LeaveTransactionComponent },
      { path: 'leave-apply-clrh', component: ApplyCLRHComponent },
      { path: 'leave-apply/:id', component: ApplyLeaveComponent },
      { path: 'leave-request', component: LeaveRequestComponent },
      { path: 'processed-request', component: ProcessedRequestComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
