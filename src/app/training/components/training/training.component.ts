import { Component, OnInit } from '@angular/core';

import { NavObject } from '../../../shared/models/nav-object';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  nav: NavObject[] = [
    { name: 'My Training', path: 'my-training' },
    { name: 'My Feedback', path: 'feedback' },
    { name: 'Training Needs', path: 'needs' },
    { name: 'Pending Request', path: 'pending-needs' },
  ]

  constructor(private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isTrainingAdmin()) {
      this.nav.push({ name: 'Training Admin', path: '/training/admin-training' });
    }
  }
}
