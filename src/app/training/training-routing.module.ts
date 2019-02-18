import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth-guard';
import { AllTrainingComponent } from './components/all-training/all-training.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MyTrainingComponent } from './components/my-training/my-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { TrainingAdminComponent } from './components/training-admin/training-admin.component';
import { TrainingComponent } from './components/training/training.component';
import { TrainingAdminGuard } from '../auth/services/training-admin-guard';

const routes: Routes = [
  { 
    path: '', 
    component: TrainingComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'my-training', component: MyTrainingComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'all-training', component: AllTrainingComponent },
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
