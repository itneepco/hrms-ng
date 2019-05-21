import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth-guard';
import { TrainingAdminGuard } from '../auth/services/training-admin-guard';
import { AdminTrainingComponent } from './components/admin-training/admin-training.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ManageTrainingComponent } from './components/manage-training/manage-training.component';
import { MyTrainingComponent } from './components/my-training/my-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
import { TrainingInstituteComponent } from './components/training-institute/training-institute.component';
import { TrainingLabelComponent } from './components/training-label/training-label.component';
import { ExecutiveNeedsComponent } from './components/training-needs/executive-needs/executive-needs.component';
import { NonexecutiveNeedsComponent } from './components/training-needs/nonexecutive-needs/nonexecutive-needs.component';
import { TrainingNeedsComponent } from './components/training-needs/training-needs.component';
import { TrainingProfileComponent } from './components/training-profile/training-profile.component';
import { TrainingComponent } from './components/training/training.component';
import { NeedsInfoResolver } from './services/training-needs-info.resolver';

const routes: Routes = [{
    path: '',
    component: TrainingComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'my-training', component: MyTrainingComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'needs', component: TrainingNeedsComponent },
      { path: 'pending-needs', component: PendingRequestComponent },
      {
        path: 'executive-needs/:needInfoId',
        component: ExecutiveNeedsComponent,
        resolve: { needInfo: NeedsInfoResolver }
      },
      { path: 'non-exec-needs/:needInfoId', component: NonexecutiveNeedsComponent },
      { path: '', redirectTo: 'my-training', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin-training',
    component: AdminTrainingComponent,
    canActivateChild: [AuthGuard, TrainingAdminGuard],
    children: [
      { path: 'training-profile', component: TrainingProfileComponent },
      { path: 'training-institute', component: TrainingInstituteComponent },
      { path: 'manage-training', component: ManageTrainingComponent },
      { path: 'new', component: NewTrainingComponent },
      { path: 'training-label', component: TrainingLabelComponent },
      { path: '', redirectTo: 'manage-training', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/training/my-training', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
