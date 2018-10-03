import { Component, Input, OnInit } from '@angular/core';

import { NavObject } from '../../models/nav-object';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {
  @Input('title') title: string;
  @Input('navObj') navObj: NavObject;

  ngOnInit() {
    // console.log(this.navObj)
  }
 }
