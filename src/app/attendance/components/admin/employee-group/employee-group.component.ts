import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EmployeeGroupService } from "src/app/attendance/services/employee-group.service";
import { GroupService } from "src/app/attendance/services/group.service";

import { AuthService } from "./../../../../auth/services/auth.service";
import { EmployeeGroupDtl } from "./../../../models/employee-group";
import { Group } from "./../../../models/group";
import { EmployeeGroupFormComponent } from "./employee-group-form/employee-group-form.component";

@Component({
  selector: "app-employee-group",
  templateUrl: "./employee-group.component.html",
  styleUrls: ["./employee-group.component.scss"]
})
export class EmployeeGroupComponent implements OnInit {
  groups: Group[];
  empGroupDtls: EmployeeGroupDtl[][] = []; // Array of EmployeeGroupDtl array

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private empGroupService: EmployeeGroupService,
    private groupService: GroupService,
    private snackbar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {
    this.groupService
      .getGroups(this.auth.currentUser.project)
      .subscribe(data => {
        this.groups = data;

        this.groups.forEach(group => {
          this.empGroupService
            .getEmployeeGroups(group.id)
            .subscribe((data: EmployeeGroupDtl[]) => {
              this.empGroupDtls[group.id] = data;
            });
        });
      });
  }

  addEmpToGroup() {
    const dialogRef = this.dialog.open(EmployeeGroupFormComponent, {
      width: "520px",
      height: "320px"
    });

    dialogRef.afterClosed().subscribe(newData => {
      if (!newData) return;

      console.log(newData);
      this.empGroupDtls[newData.group_id].push(newData);

      this.snackbar.open(
        "Successfully added employee to the group",
        "Dismiss",
        {
          duration: 1600
        }
      );
    });
  }

  onEdit(empGroup: EmployeeGroupDtl) {
    const dialogRef = this.dialog.open(EmployeeGroupFormComponent, {
      width: "520px",
      height: "320px",
      data: empGroup
    });

    dialogRef.afterClosed().subscribe(newData => {
      if (!newData) return;

      console.log(newData);
      const index = this.empGroupDtls[empGroup.group_id].findIndex(
        data => data.id === empGroup.id
      );
      this.empGroupDtls[empGroup.group_id].splice(index, 1);
      this.empGroupDtls[newData.group_id].push(newData);

      this.snackbar.open(
        "Successfully edited employee group record",
        "Dismiss",
        {
          duration: 1600
        }
      );
    });
  }

  // filterEmpGroup(groupId: number) {
  //   return this.empGroupDtls.filter(row => row.group_id == groupId);
  // }

  goBack() {
    this.location.back();
  }
}
