import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { AdminGuard } from './auth/services/admin-guard';
import { AuthGuard } from './auth/services/auth-guard';
import { LoginGuard } from './auth/services/login-guard';
import { ApplyCLRHComponent } from './leave/components/apply-clrh/apply-clrh.component';
import { ApplyLeaveComponent } from './leave/components/apply-leave/apply-leave.component';
import { HolidayListComponent } from './admin/components/holiday-list/holiday-list.component';
import { LeaveDashboardComponent } from './leave/components/leave-dashboard/leave-dashboard.component';
import { LeaveLedgerComponent } from './admin/components/leave-ledger/leave-ledger.component';
import { LeaveRequestComponent } from './leave/components/leave-request/leave-request.component';
import { LeaveTransactionComponent } from './leave/components/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './leave/components/leave/leave.component';
import { ProcessedRequestComponent } from './leave/components/processed-request/processed-request.component';

const routes: Routes = [
  {
    path: 'administrator',
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard],
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: 'statements',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: 'app/statement/statement.module#StatementModule'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'leave',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LeaveComponent,
    children: [
      { path: 'dashboard', component: LeaveDashboardComponent },
      { path: 'leave-transaction', component: LeaveTransactionComponent },
      { path: 'leave-apply-clrh', component: ApplyCLRHComponent },
      { path: 'leave-apply/:id', component: ApplyLeaveComponent },
      { path: 'leave-request', component: LeaveRequestComponent },
      { path: 'processed-request', component: ProcessedRequestComponent },
      { 
        path: 'leave-ledger', 
        component: LeaveLedgerComponent,
        canActivate: [AdminGuard] 
      },
      { 
        path: 'holiday-list', 
        component: HolidayListComponent,
        canActivate: [AdminGuard] 
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'training',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: 'app/training/training.module#TrainingModule'
  },
  { path: '', redirectTo: '/leave/dashboard', pathMatch: "full" },
  { path: '**', redirectTo: '/leave/dashboard', pathMatch: "full" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
