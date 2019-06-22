import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance/attendance.component';
import { ShiftComponent } from './admin/shift/shift.component';
import { GroupComponent } from './admin/group/group.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AdminDashboardComponent, AttendanceComponent, ShiftComponent, GroupComponent, DashboardComponent],
  imports: [
    SharedModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
