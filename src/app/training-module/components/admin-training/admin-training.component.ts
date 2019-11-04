import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { NavObject } from './../../../shared/models/nav-object';

@Component({
  selector: 'app-admin-training',
  templateUrl: './admin-training.component.html',
  styleUrls: ['./admin-training.component.scss']
})
export class AdminTrainingComponent implements OnInit {
  nav: NavObject[] = [];

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.isTrainingAdmin()) {
      this.nav.push({ name: 'Dashboard', path: 'dashboard' });
      this.nav.push({ name: 'Manage Training', path: 'manage-training' });
      this.nav.push({ name: 'View Profile', path: 'training-profile' });
      this.nav.push({ name: 'Institutes', path: 'training-institute' });
      this.nav.push({ name: 'Training Category', path: 'training-label'});
    }

    this.nav.push({ name: 'My Training', path: '/training/my-training' });
  }
}
