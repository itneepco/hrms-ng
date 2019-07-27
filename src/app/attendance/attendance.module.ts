import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AttendanceRoutingModule } from './attendance-routing.module';
import {
  EmployeeGroupFormComponent,
} from './components/admin/employee-group/employee-group-form/employee-group-form.component';
import { EmployeeGroupComponent } from './components/admin/employee-group/employee-group.component';
import { GenGroupRosterComponent } from './components/admin/gen-group-roster/gen-group-roster.component';
import { ChangeTimingComponent } from './components/admin/gen-group-roster/change-timing/change-timing.component';
import { GroupRosterComponent } from './components/admin/group-roster/group-roster.component';
import { GroupFormComponent } from './components/admin/group/group-form/group-form.component';
import { GroupComponent } from './components/admin/group/group.component';
import { ShiftFormComponent } from './components/admin/shift/shift-form/shift-form.component';
import { ShiftComponent } from './components/admin/shift/shift.component';
import { WageMonthFormComponent } from './components/admin/wage-month-form/wage-month-form.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    AttendanceRoutingModule
  ],
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
    GroupRosterComponent,
    GenGroupRosterComponent,
    ChangeTimingComponent,
  ],
  entryComponents: [
    ShiftFormComponent,
    GroupFormComponent,
    WageMonthFormComponent,
    EmployeeGroupFormComponent,
    ChangeTimingComponent
  ],
})
export class AttendanceModule {}
