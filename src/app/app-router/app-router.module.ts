import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../auth/components/login/login.component';
import { HierarchyHomeComponent } from '../hierarchy/components/hierarchy-home/hierarchy-home.component';
import { HierarchyComponent } from '../hierarchy/components/hierarchy/hierarchy.component';
import { FeedbackComponent } from '../training/feedback/feedback.component';
import { TrainingComponent } from '../training/training/training.component';
import { AuthGuard } from './../auth/services/auth-guard.service';
import { LoginGuard } from '../auth/services/login-guard';
import { LeaveListComponent } from './../leave/leave-list/leave-list.component';
import { LeaveTransactionComponent } from './../leave/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './../leave/leave/leave.component';
import { ArchivedComponent } from './../training/archived/archived.component';
import { NewTrainingComponent } from './../training/new-training/new-training.component';
import { UpcomingComponent } from './../training/upcoming/upcoming.component';

const routes: Routes = [
  {
    path: 'hierarchy',
    canActivate: [AuthGuard],
    component: HierarchyComponent,
    children: [
      { path: 'home', component: HierarchyHomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'leave',
    canActivate: [AuthGuard],
    component: LeaveComponent,
    children: [
      { path: 'leave-transaction', component: LeaveTransactionComponent },
      { path: 'leave-list', component: LeaveListComponent },
      { path: '', redirectTo: 'leave-list', pathMatch: 'full' }
    ]
  },
  {
    path: 'training',
    canActivate: [AuthGuard],
    component: TrainingComponent,
    children: [
      { path: 'new', component: NewTrainingComponent },
      { path: 'archived', component: ArchivedComponent },
      { path: 'upcoming', component: UpcomingComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: '', redirectTo: 'new', pathMatch: 'full' }
    ]
  },
  {
    path: '', redirectTo: '/leave/leave-list', pathMatch: "full"
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
