import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FeedbackFormComponent } from './components/feedback/feedback-form/feedback-form.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MyTrainingComponent } from './components/my-training/my-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { TrainingAdminComponent } from './components/training-admin/training-admin.component';
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
import { DataService } from './services/data.service';
import { ExecutiveNeedService } from './services/executive-need.service';
import { FeedbackService } from './services/feedback.service';
import { MyFeedbackStatusService } from './services/my-feedback-status.service';
import { NeedsInfoService } from './services/needs-info.service';
import { NeedsWorkflowService } from './services/needs-workflow.service';
import { TrainingInstituteService } from './services/training-institute.service';
import { TrainingParticipantService } from './services/training-participant.service';
import { TrainingTopicService } from './services/training-topic.service';
import { TrainingService } from './services/training.service';
import { TrainingRoutingModule } from './training-routing.module';

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
    ExecutiveNeedsFormComponent,
    WorkflowComponent,
  ],
  entryComponents: [
    TrainingDetailComponent,
    FeedbackFormComponent,
    TrainingInstituteFormComponent,
    ExecutiveNeedsFormComponent
  ],
})
export class TrainingModule { }
