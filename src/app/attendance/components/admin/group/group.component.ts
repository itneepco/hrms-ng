import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Group } from './../../../models/group';
import { GroupService } from './../../../services/group.service';
import { GroupFormComponent } from './group-form/group-form.component';

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"]
})
export class GroupComponent implements OnInit {
  displayedColumns = ["position", "name", "is_general", "actions"];

  dataSource: MatTableDataSource<Group>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private location: Location,
    private groupService: GroupService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.groupService.getGroups().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource<Group>(data);
      this.dataSource.sort = this.sort;
    });
  }

  onAddGroup() {
    const dialogRef = this.dialog.open(GroupFormComponent, {
      width: "520px",
      height: "340px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.snackbar.open("Successfully added the group record", "Dismiss", {
        duration: 1600
      });
      const temp = this.dataSource.data;
      temp.unshift(result);
      this.dataSource.data = temp;
    });
  }

  onEdit(group: Group) {
    const dialogRef = this.dialog.open(GroupFormComponent, {
      width: "520px",
      height: "340px",
      data: group
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.snackbar.open("Successfully edited the group record", "Dismiss", {
        duration: 1600
      });
      const index = this.dataSource.data.indexOf(group);
      const temp = this.dataSource.data;
      temp[index] = result;
      this.dataSource.data = temp;
    });
  }

  onRemove(group: Group) {
    const retVal = confirm("Are you sure you want to delete?");
    if (retVal === true) {
      this.groupService.deleteGroup(group.id).subscribe(
        () => {
          const index = this.dataSource.data.indexOf(group);
          const temp = this.dataSource.data;
          temp.splice(index, 1);
          this.dataSource.data = temp;
          this.snackbar.open(
            "Successfully deleted the group record",
            "Dismiss",
            {
              duration: 1600
            }
          );
        },
        error => {
          console.log(error);
          this.snackbar.open(
            "Cannot delete group record. Its being referenced by other table",
            "Dismiss",
            {
              duration: 2500
            }
          );
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }

  isGeneral(val: boolean) {
    return this.groupService.isGeneralGroup(val);
  }
}
