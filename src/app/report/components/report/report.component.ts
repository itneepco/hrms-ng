import { Component, OnInit } from '@angular/core';
import { NavObject } from '../../../shared/models/nav-object';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  nav: NavObject[] = [
    { name: 'Technical Report', path: 'technical-report' },
  ]
}
