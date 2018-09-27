import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/services/auth-guard';
import { LoginGuard } from './auth/services/login-guard';
import { HierarchyComponent } from './hierarchy/components/hierarchy/hierarchy.component';
import { ApplyLeaveComponent } from './leave/components/apply-leave/apply-leave.component';
import { HolidayListComponent } from './leave/components/holiday-list/holiday-list.component';
import { LeaveLedgerComponent } from './leave/components/leave-ledger/leave-ledger.component';
import { LeaveRequestComponent } from './leave/components/leave-request/leave-request.component';
import { LeaveTransactionComponent } from './leave/components/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './leave/components/leave/leave.component';
import { ProcessedRequestComponent } from './leave/components/processed-request/processed-request.component';
import { LeaveDashboardComponent } from './leave/components/leave-dashboard/leave-dashboard.component';
import { ApplyElComponent } from './leave/components/apply-el/apply-el.component';

const routes: Routes = [
  {
    path: 'hierarchy',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: HierarchyComponent,
    loadChildren: 'app/hierarchy/hierarchy.module#HierarchyModule'
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
      { path: 'leave-dashboard', component: LeaveDashboardComponent },
      { path: 'leave-transaction', component: LeaveTransactionComponent },
      { path: 'leave-apply', component: ApplyLeaveComponent },
      { path: 'leave-apply-el', component: ApplyElComponent },
      { path: 'leave-request', component: LeaveRequestComponent },
      { path: 'processed-request', component: ProcessedRequestComponent },
      { path: 'leave-ledger', component: LeaveLedgerComponent },
      { path: 'holiday-list', component: HolidayListComponent },
      { path: '', redirectTo: 'leave-dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'training',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: 'app/training/training.module#TrainingModule'
  },
  { path: '', redirectTo: '/leave/leave-transaction', pathMatch: "full" },
  { path: '**', redirectTo: '/leave/leave-transaction', pathMatch: "full" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
