import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/services/auth-guard";
import { TimeOfficeGuard } from "../auth/services/time-office-guard";
import { AbsentDtlComponent } from "./components/admin/absent-dtl/absent-dtl.component";
import { AbsenteeStatementComponent } from "./components/admin/absentee-statement/absentee-statement.component";
import { ApproveWorkflowComponent } from "./components/admin/approve-workflow/approve-workflow.component";
import { EmployeeGroupComponent } from "./components/admin/employee-group/employee-group.component";
import { GenGroupRosterComponent } from "./components/admin/gen-group-roster/gen-group-roster.component";
import { GroupComponent } from "./components/admin/group/group.component";
import { ProcessAttendanceComponent } from "./components/admin/process-attendance/process-attendance.component";
import { ShiftRosterComponent } from "./components/admin/shift-roster/shift-roster.component";
import { ShiftComponent } from "./components/admin/shift/shift.component";
import { UploadDataComponent } from "./components/admin/upload-data/upload-data.component";
import { AttendanceStatusComponent } from "./components/attendance-status/attendance-status.component";
import { AttendanceComponent } from "./components/attendance/attendance.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegularizationWorkflowComponent } from "./components/regularization-workflow/regularization-workflow.component";

const routes: Routes = [
  {
    path: "",
    component: AttendanceComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      {
        path: "shift",
        component: ShiftComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: "group",
        component: GroupComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: "employee-group",
        component: EmployeeGroupComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: "shift-grp-roster",
        component: ShiftRosterComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: "gen-grp-roster",
        component: GenGroupRosterComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: "upload-data",
        component: UploadDataComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: "absent-dtl",
        component: AbsentDtlComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: "process-data",
        component: ProcessAttendanceComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: "absentee-statement",
        component: AbsenteeStatementComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: "status",
        component: AttendanceStatusComponent
      },
      {
        path: "reg-workflow",
        component: RegularizationWorkflowComponent
      },
      {
        path: "approve-workflow",
        component: ApproveWorkflowComponent
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule {}
