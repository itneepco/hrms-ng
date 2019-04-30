import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth-guard';
import { TrainingAdminGuard } from '../auth/services/training-admin-guard';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MyTrainingComponent } from './components/my-training/my-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { TrainingAdminComponent } from './components/training-admin/training-admin.component';
import { TrainingInstituteComponent } from './components/training-institute/training-institute.component';
import { ExecutiveNeedsComponent } from './components/training-needs/executive-needs/executive-needs.component';
import { NonexecutiveNeedsComponent } from './components/training-needs/nonexecutive-needs/nonexecutive-needs.component';
import { TrainingNeedsComponent } from './components/training-needs/training-needs.component';
import { TrainingProfileComponent } from './components/training-profile/training-profile.component';
import { TrainingComponent } from './components/training/training.component';

const routes: Routes = [
  { 
    path: '', 
    component: TrainingComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'my-training', component: MyTrainingComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'training-needs', component: TrainingNeedsComponent },
      { path: 'executive-needs/:year', component: ExecutiveNeedsComponent },
      { path: 'non-exec-needs/:year', component: NonexecutiveNeedsComponent },
      { 
        path: 'training-profile',
        component: TrainingProfileComponent, 
        canActivate: [TrainingAdminGuard]
      },
      { 
        path: 'training-institute', 
        component: TrainingInstituteComponent,
        canActivate: [TrainingAdminGuard]
      },
      { 
        path: 'training-admin', 
        component: TrainingAdminComponent,
        canActivate: [TrainingAdminGuard]
      },
      { 
        path: 'new', 
        component: NewTrainingComponent,
        canActivate: [TrainingAdminGuard] 
      },
      { path: '', redirectTo: 'my-training', pathMatch: 'full' }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
