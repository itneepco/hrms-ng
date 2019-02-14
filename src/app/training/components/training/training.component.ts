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
    { name: 'Upcoming', path: 'upcoming' },
    { name: 'Archived', path: 'archived' },
    { name: 'Feedback', path: 'feedback' }
  ]

  constructor(private auth: AuthService) {}

  ngOnInit() {  
    if(this.auth.isTrainingAdmin()) {
      this.nav.push({ name: 'New / Edit', path: 'new' })
    }
  }
}
