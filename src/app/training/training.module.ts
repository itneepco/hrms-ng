import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AllTrainingComponent } from './components/all-training/all-training.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MyTrainingComponent } from './components/my-training/my-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { TrainingAdminComponent } from './components/training-admin/training-admin.component';
import { TrainingTableComponent } from './components/training-table/training-table.component';
import { TrainingComponent } from './components/training/training.component';
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
    AllTrainingComponent,
    TrainingTableComponent,
  ]
})
export class TrainingModule { }
