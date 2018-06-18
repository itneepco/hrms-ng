import { Component, OnInit } from '@angular/core';
import { NavObject } from '../../shared/model/nav-object';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  nav: NavObject[] = [
    { name: 'New', path: 'new' },
    { name: 'Upcoming', path: 'upcoming' },
    { name: 'Archived', path: 'archived' },
    { name: 'Feedback', path: 'feedback' }
  ]

}
