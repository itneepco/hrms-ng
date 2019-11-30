import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavObject } from '../../../shared/models/nav-object';
import { PendingRequestStatusService } from '../../services/pending-request-status.service';
import { TrainingService } from '../../services/training.service';
import { AuthService } from './../../../auth/services/auth.service';
import { MyFeedbackStatusService } from './../../services/my-feedback-status.service';
import { NeedsInfoService } from './../../services/needs-info.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  nav: NavObject[] = [
    { name: 'My Training', path: 'my-training' },
    { name: 'My Feedback', path: 'feedback' },
    { name: 'Training Needs', path: 'needs' },
    { name: 'Pending Request', path: 'pending-needs' },
  ];
  feedbackSubs: Subscription;
  pendingSubs: Subscription;

  constructor(private auth: AuthService,
    private myFeedbackStatus: MyFeedbackStatusService,
    private needsInfoService: NeedsInfoService,
    private pendingRequestStatus: PendingRequestStatusService,
    private trainingService: TrainingService) {}

  ngOnInit() {
    if (this.auth.isTrainingAdmin()) {
      this.nav.push({ name: 'Admin Section', path: '/training/admin-training' });
    }
    this.getPendingFeedbackCount();
    this.getPendingTrgNeedsCount();

    this.feedbackSubs = this.myFeedbackStatus.status$.subscribe(() => this.getPendingFeedbackCount());
    this.pendingSubs = this.pendingRequestStatus.status$.subscribe(() => this.getPendingTrgNeedsCount());
  }

  getPendingFeedbackCount() {
    this.trainingService.feedbackPendingCount()
    .subscribe((count: number) => {
      this.nav[1].count = count ? count : 0 ;
    });
  }


  getPendingTrgNeedsCount() {
    this.needsInfoService.pendingNeedsCount(this.auth.currentUser.emp_code)
    .subscribe(count => {
      this.nav[3].count = count ? count : 0 ;
    });
  }

  ngOnDestroy() {
    this.feedbackSubs.unsubscribe();
    this.pendingSubs.unsubscribe();
  }
}
