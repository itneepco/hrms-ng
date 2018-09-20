import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/services/auth-guard';
import { LoginGuard } from './auth/services/login-guard';
import { HierarchyHomeComponent } from './hierarchy/components/hierarchy-home/hierarchy-home.component';
import { HierarchyComponent } from './hierarchy/components/hierarchy/hierarchy.component';
import { ApplyLeaveComponent } from './leave/components/apply-leave/apply-leave.component';
import { HolidayListComponent } from './leave/components/holiday-list/holiday-list.component';
import { LeaveLedgerComponent } from './leave/components/leave-ledger/leave-ledger.component';
import { LeaveRequestComponent } from './leave/components/leave-request/leave-request.component';
import { LeaveTransactionComponent } from './leave/components/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './leave/components/leave/leave.component';
import { ArchivedComponent } from './training/archived/archived.component';
import { FeedbackComponent } from './training/feedback/feedback.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { TrainingComponent } from './training/training/training.component';
import { UpcomingComponent } from './training/upcoming/upcoming.component';

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
      { path: 'leave-transaction', component: LeaveTransactionComponent },
      { path: 'leave-apply', component: ApplyLeaveComponent },
      { path: 'leave-request', component: LeaveRequestComponent },
      { path: 'leave-ledger', component: LeaveLedgerComponent },
      { path: 'holiday-list', component: HolidayListComponent },
      { path: '', redirectTo: 'leave-transaction', pathMatch: 'full' }
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
