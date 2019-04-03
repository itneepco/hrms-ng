import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-dashboard',
  templateUrl: './training-dashboard.component.html',
  styleUrls: ['./training-dashboard.component.scss']
})
export class TrainingDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  trainingNeeds() {
    this.router.navigate(['/training/training-needs'])
  }
}
