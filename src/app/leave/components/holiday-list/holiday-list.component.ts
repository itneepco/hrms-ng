import { Holiday } from './../../shared/holiday';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {
  displayedColumns = [ "name", "date", "type", "actions" ];
  holidays: Holiday[] = []

  constructor() { }

  ngOnInit() {
  }

  onRemove(holiday: Holiday) {

  }

}
