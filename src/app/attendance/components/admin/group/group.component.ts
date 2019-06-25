import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Group } from './../../../models/group';
import { GroupService } from './../../../services/group.service';
import { GroupFormComponent } from './group-form/group-form.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  displayedColumns = [
    "position",
    "name",
    "is_general",
    "actions"
  ];

  dataSource: MatTableDataSource<Group>;

  constructor(private location: Location,
    private groupService: GroupService,
    private auth: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.groupService.getGroups(this.auth.currentUser.project).subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource<Group>(data)
    })
  }


  onEdit(group: Group) {

  }

  onRemove(group: Group) {

  }

  goBack() {
    this.location.back();
  }

  onAddGroup() {
    this.dialog.open(GroupFormComponent, {
      width: '520px',
      height: '320px'
    })
  }
}
