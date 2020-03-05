import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AttendanceRoutingModule } from "./attendance-routing.module";
import { AbsentDtlFormComponent } from "./components/admin/absent-dtl/absent-dtl-form/absent-dtl-form.component";
import { AbsentDtlComponent } from "./components/admin/absent-dtl/absent-dtl.component";
import { AbsenteeStatementComponent } from "./components/admin/absentee-statement/absentee-statement.component";
import { EmployeeGroupFormComponent } from "./components/admin/employee-group/employee-group-form/employee-group-form.component";
import { EmployeeGroupComponent } from "./components/admin/employee-group/employee-group.component";
import { ChangeTimingComponent } from "./components/admin/gen-group-roster/change-timing/change-timing.component";
import { GenGroupRosterComponent } from "./components/admin/gen-group-roster/gen-group-roster.component";
import { GroupFormComponent } from "./components/admin/group/group-form/group-form.component";
import { GroupComponent } from "./components/admin/group/group.component";
import { ProcessAttendanceComponent } from "./components/admin/process-attendance/process-attendance.component";
import { ShiftRosterComponent } from "./components/admin/shift-roster/shift-roster.component";
import { ShiftFormComponent } from "./components/admin/shift/shift-form/shift-form.component";
import { ShiftComponent } from "./components/admin/shift/shift.component";
import { UploadDataComponent } from "./components/admin/upload-data/upload-data.component";
import { WageMonthFormComponent } from "./components/admin/wage-month-form/wage-month-form.component";
import { AttendanceStatusComponent } from "./components/attendance-status/attendance-status.component";
import { ChangeShiftComponent } from "./components/attendance-status/change-shift/change-shift.component";
import { PunchRegularizeComponent } from "./components/attendance-status/punch-regularize/punch-regularize.component";
import { AttendanceComponent } from "./components/attendance/attendance.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegularizationWorkflowComponent } from "./components/regularization-workflow/regularization-workflow.component";
import { AttendTableComponent } from "./components/shared/attend-table/attend-table.component";
import { WorkflowDetailComponent } from "./components/shared/workflow-detail/workflow-detail.component";
import { ApproveWorkflowComponent } from './components/admin/approve-workflow/approve-workflow.component';

@NgModule({
  imports: [SharedModule, AttendanceRoutingModule],
  declarations: [
    AttendanceComponent,
    DashboardComponent,
    ShiftComponent,
    ShiftFormComponent,
    GroupComponent,
    GroupFormComponent,
    WageMonthFormComponent,
    EmployeeGroupComponent,
    EmployeeGroupFormComponent,
    ShiftRosterComponent,
    GenGroupRosterComponent,
    ChangeTimingComponent,
    UploadDataComponent,
    AbsentDtlComponent,
    AbsentDtlFormComponent,
    ProcessAttendanceComponent,
    AttendanceStatusComponent,
    ChangeShiftComponent,
    AbsenteeStatementComponent,
    PunchRegularizeComponent,
    RegularizationWorkflowComponent,
    AttendTableComponent,
    WorkflowDetailComponent,
    ApproveWorkflowComponent
  ],
  entryComponents: [
    ShiftFormComponent,
    GroupFormComponent,
    WageMonthFormComponent,
    EmployeeGroupFormComponent,
    ChangeTimingComponent,
    AbsentDtlFormComponent,
    ChangeShiftComponent,
    PunchRegularizeComponent,
    WorkflowDetailComponent
  ]
})
export class AttendanceModule {}
