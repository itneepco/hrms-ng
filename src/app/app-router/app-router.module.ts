import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedbackComponent } from '../training/feedback/feedback.component';
import { TrainingComponent } from '../training/training/training.component';
import { LeaveListComponent } from './../leave/leave-list/leave-list.component';
import { LeaveTransactionComponent } from './../leave/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './../leave/leave/leave.component';
import { ArchivedComponent } from './../training/archived/archived.component';
import { NewTrainingComponent } from './../training/new-training/new-training.component';
import { UpcomingComponent } from './../training/upcoming/upcoming.component';
import { LoginComponent } from '../core/components/login/login.component';
import { HierarchyComponent } from '../hierarchy/hierarchy/hierarchy.component';
import { HierarchyHomeComponent } from '../hierarchy/hierarchy-home/hierarchy-home.component';

const routes: Routes = [
  {
    path: 'hierarchy',
    component: HierarchyComponent,
    children: [
      { path: 'home', component: HierarchyHomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ] 
  },
  { path: 'login', component: LoginComponent },
  { 
    path: 'leave', 
    component: LeaveComponent,
    children: [
      { path: 'leave-transaction', component: LeaveTransactionComponent },
      { path: 'leave-list', component: LeaveListComponent },
      { path: '', redirectTo: 'leave-list', pathMatch: 'full' }
    ] 
  },
  { 
    path: 'training', 
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
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouterModule { }
