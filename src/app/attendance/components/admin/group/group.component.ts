import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GroupFormComponent } from './group-form/group-form.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(private location: Location, private dialog: MatDialog) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  onAddGroup() {
    this.dialog.open(GroupFormComponent, {
      width: '550px',
      height: '450px'
    })
  }
}
