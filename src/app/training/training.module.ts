import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminTrainingComponent } from './components/admin-training/admin-training.component';
import { FeedbackFormComponent } from './components/feedback/feedback-form/feedback-form.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ManageTrainingComponent } from './components/manage-training/manage-training.component';
import { MyTrainingComponent } from './components/my-training/my-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
import { TrainingDashboardComponent } from './components/training-dashboard/training-dashboard.component';
import { TrainingDetailComponent } from './components/training-detail/training-detail.component';
import {
  TrainingInstituteFormComponent,
} from './components/training-institute/training-institute-form/training-institute-form.component';
import { TrainingInstituteComponent } from './components/training-institute/training-institute.component';
import {
  ExecutiveNeedsFormComponent,
} from './components/training-needs/executive-needs/executive-needs-form/executive-needs-form.component';
import { ExecutiveNeedsComponent } from './components/training-needs/executive-needs/executive-needs.component';
import { NonexecutiveNeedsComponent } from './components/training-needs/nonexecutive-needs/nonexecutive-needs.component';
import { TrainingNeedsComponent } from './components/training-needs/training-needs.component';
import { WorkflowComponent } from './components/training-needs/workflow/workflow.component';
import { TrainingProfileComponent } from './components/training-profile/training-profile.component';
import { TrainingTableComponent } from './components/training-table/training-table.component';
import { TrainingComponent } from './components/training/training.component';
import { NeedsInfoResolver } from './services/training-needs-info.resolver';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingLabelComponent } from './components/training-label/training-label.component';

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
    ManageTrainingComponent,
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
    ExecutiveNeedsFormComponent,
    WorkflowComponent,
    PendingRequestComponent,
    AdminTrainingComponent,
    TrainingLabelComponent,
  ],
  entryComponents: [
    TrainingDetailComponent,
    FeedbackFormComponent,
    TrainingInstituteFormComponent,
    ExecutiveNeedsFormComponent
  ],
  providers: [NeedsInfoResolver]
})
export class TrainingModule { }
