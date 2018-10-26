import { Component, OnInit } from '@angular/core';
import { NavObject } from '../../shared/models/nav-object';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {

  navObj: NavObject[] = [
    { name: 'Salary Statement', path: 'salary' },
    { name: 'Approved Leaves', path: 'approved-leaves' },
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
