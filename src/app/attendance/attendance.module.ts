import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { GroupFormComponent } from './components/admin/group/group-form/group-form.component';
import { GroupComponent } from './components/admin/group/group.component';
import { ShiftFormComponent } from './components/admin/shift/shift-form/shift-form.component';
import { ShiftComponent } from './components/admin/shift/shift.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GroupService } from './services/group.service';
import { ShiftService } from './services/shift.service';

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
  ],
  entryComponents: [
    ShiftFormComponent,
    GroupFormComponent
  ],
  providers: [
    ShiftService,
    GroupService,
  ]
})
export class AttendanceModule {}
