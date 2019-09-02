import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Sort } from "@angular/material/sort";
import { EmployeeGroupService } from "src/app/attendance/services/employee-group.service";
import { GroupService } from "src/app/attendance/services/group.service";
import { Employee } from "./../../../../shared/models/employee";
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
  employees: Employee[] = [];

  constructor(
    private dialog: MatDialog,
    private empGroupService: EmployeeGroupService,
    private groupService: GroupService,
    private snackbar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;

      this.groups.forEach(group => {
        this.empGroupService
          .getEmployeeGroups(group.id)
          .subscribe((data: EmployeeGroupDtl[]) => {
            this.empGroupDtls[group.id] = data;
          });
      });
    });

    this.empGroupService
      .getExemptedEmployees()
      .subscribe(employees => (this.employees = employees));
  }

  addEmpToGroup(employee?: Employee) {
    let empGroup;
    if (employee) {
      empGroup = {} as EmployeeGroupDtl;
      empGroup.employee = employee;
    }

    const dialogRef = this.dialog.open(EmployeeGroupFormComponent, {
      width: "520px",
      height: "320px",
      data: { empGroup }
    });

    dialogRef.afterClosed().subscribe((newData: EmployeeGroupDtl) => {
      if (!newData) return;

      console.log(newData);
      this.empGroupDtls[newData.group_id].push(newData);
      this.employees = this.employees.filter(
        employee => employee.emp_code != newData.employee.emp_code
      );

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
      data: { empGroup }
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

  onDelete(empGroup: EmployeeGroupDtl) {
    const retVal = confirm("Are you sure you want to delete?");
    if (retVal != true) return;

    this.empGroupService.deleteEmployeeGroup(empGroup.id).subscribe(() => {
      const index = this.empGroupDtls[empGroup.group_id].findIndex(
        data => data.id === empGroup.id
      );
      this.empGroupDtls[empGroup.group_id].splice(index, 1);
      this.empGroupDtls = [...this.empGroupDtls];
    });
  }

  goBack() {
    this.location.back();
  }

  sortData(sort: Sort, group: Group) {
    console.log(sort);
    const data = this.empGroupDtls[group.id].slice();
    if (!sort.active || sort.direction === "") {
      this.empGroupDtls[group.id] = data;
      return;
    }

    this.empGroupDtls[group.id] = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "first_name":
          return compare(a.employee.first_name, b.employee.first_name, isAsc);
        case "last_name":
          return compare(a.employee.last_name, b.employee.last_name, isAsc);
        case "emp_code":
          return compare(a.employee.emp_code, b.employee.emp_code, isAsc);
        case "designation":
          return compare(a.employee.designation, b.employee.designation, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
