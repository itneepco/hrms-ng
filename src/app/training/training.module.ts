import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ArchivedComponent } from './components/archived/archived.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './components/training/training.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';

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
