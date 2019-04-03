import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FeedbackFormComponent } from './components/feedback/feedback-form/feedback-form.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MyTrainingComponent } from './components/my-training/my-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { TrainingAdminComponent } from './components/training-admin/training-admin.component';
import { TrainingDashboardComponent } from './components/training-dashboard/training-dashboard.component';
import { TrainingDetailComponent } from './components/training-detail/training-detail.component';
import { TrainingInstituteFormComponent } from './components/training-institute/training-institute-form/training-institute-form.component';
import { TrainingInstituteComponent } from './components/training-institute/training-institute.component';
import { TrainingProfileComponent } from './components/training-profile/training-profile.component';
import { TrainingTableComponent } from './components/training-table/training-table.component';
import { TrainingComponent } from './components/training/training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { ExecutiveNeedsComponent } from './components/training-needs/executive-needs/executive-needs.component';
import { TrainingNeedsComponent } from './components/training-needs/training-needs.component';
import { NonexecutiveNeedsComponent } from './components/training-needs/nonexecutive-needs/nonexecutive-needs.component';

@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  declarations: [
    TrainingComponent,
    FeedbackComponent,
    NewTrainingComponent,
    MyTrainingComponent,
    TrainingAdminComponent,
    TrainingTableComponent,
    TrainingDetailComponent,
    FeedbackFormComponent,
    TrainingProfileComponent,
    TrainingInstituteComponent,
    TrainingDashboardComponent,
    TrainingInstituteFormComponent,
    ExecutiveNeedsComponent,
    TrainingNeedsComponent,
    NonexecutiveNeedsComponent,
  ],
  entryComponents: [
    TrainingDetailComponent,
    FeedbackFormComponent,
    TrainingInstituteFormComponent,
  ]
})
export class TrainingModule { }
