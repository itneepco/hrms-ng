import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
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
  empGroupDtls: EmployeeGroupDtl[];

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private empGroupService: EmployeeGroupService,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.groupService
      .getGroups(this.auth.currentUser.project)
      .subscribe(data => {
        this.groups = data;

        this.groups.forEach(group => {
          this.empGroupService
            .getEmployeeGroups(group.id)
            .subscribe(data => this.empGroupDtls.push(data));
        });
      });
  }

  addEmpToGroup() {
    this.dialog.open(EmployeeGroupFormComponent, {
      width: "520px",
      height: "320px"
    });
  }
}
