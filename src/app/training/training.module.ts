import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ArchivedComponent } from './archived/archived.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training/training.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  declarations: [
    TrainingComponent,
    ArchivedComponent,
    UpcomingComponent,
    FeedbackComponent,
    NewTrainingComponent,
  ]
})
export class TrainingModule { }
