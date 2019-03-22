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
    { name: 'Dashboard', path: 'training-dashboard' },
    { name: 'My Training', path: 'my-training' },
    { name: 'My Feedback', path: 'feedback' },
  ]

  constructor(private auth: AuthService) {}

  ngOnInit() {  
    if(this.auth.isTrainingAdmin()) {
      this.nav.push({ name: 'Manage Training', path: 'training-admin' })
      this.nav.push({ name: 'View Profile', path: 'training-profile' })
      this.nav.push({ name: 'Institutes', path: 'training-institute' })
    }
  }
}
