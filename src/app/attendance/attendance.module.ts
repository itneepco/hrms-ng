import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../shared/shared.module';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AbsentDtlFormComponent } from './components/admin/absent-dtl/absent-dtl-form/absent-dtl-form.component';
import { AbsentDtlComponent } from './components/admin/absent-dtl/absent-dtl.component';
import {
  EmployeeGroupFormComponent,
} from './components/admin/employee-group/employee-group-form/employee-group-form.component';
import { EmployeeGroupComponent } from './components/admin/employee-group/employee-group.component';
import { ChangeTimingComponent } from './components/admin/gen-group-roster/change-timing/change-timing.component';
import { GenGroupRosterComponent } from './components/admin/gen-group-roster/gen-group-roster.component';
import { ShiftRosterComponent } from './components/admin/shift-roster/shift-roster.component';
import { GroupFormComponent } from './components/admin/group/group-form/group-form.component';
import { GroupComponent } from './components/admin/group/group.component';
import { ShiftFormComponent } from './components/admin/shift/shift-form/shift-form.component';
import { ShiftComponent } from './components/admin/shift/shift.component';
import { UploadDataComponent } from './components/admin/upload-data/upload-data.component';
import { WageMonthFormComponent } from './components/admin/wage-month-form/wage-month-form.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProcessAttendanceComponent } from './components/admin/process-attendance/process-attendance.component';
import { AttendanceStatusComponent } from './components/attendance-status/attendance-status.component';
import { ChangeStatusComponent } from './components/attendance-status/change-status/change-status.component';

@NgModule({
  imports: [SharedModule, AttendanceRoutingModule, FileUploadModule],
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
    ChangeStatusComponent
  ],
  entryComponents: [
    ShiftFormComponent,
    GroupFormComponent,
    WageMonthFormComponent,
    EmployeeGroupFormComponent,
    ChangeTimingComponent,
    AbsentDtlFormComponent,
    ChangeStatusComponent
  ]
})
export class AttendanceModule { }
