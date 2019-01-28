import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth-guard';
import { ArchivedComponent } from './components/archived/archived.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { TrainingComponent } from './components/training/training.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';

const routes: Routes = [
  { 
    path: '', 
    component: TrainingComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'new', component: NewTrainingComponent },
      { path: 'archived', component: ArchivedComponent },
      { path: 'upcoming', component: UpcomingComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: '', redirectTo: 'new', pathMatch: 'full' }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
