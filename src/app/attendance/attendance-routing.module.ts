import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth-guard';
import { TimeOfficeGuard } from '../auth/services/time-office-guard';
import { EmployeeGroupComponent } from './components/admin/employee-group/employee-group.component';
import { GroupRosterComponent } from './components/admin/group-roster/group-roster.component';
import { GroupComponent } from './components/admin/group/group.component';
import { ShiftComponent } from './components/admin/shift/shift.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'shift',
        component: ShiftComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: 'group',
        component: GroupComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: 'employee-group',
        component: EmployeeGroupComponent,
        canActivate: [TimeOfficeGuard]
      },
      {
        path: 'group-roster',
        component: GroupRosterComponent,
        canActivate: [TimeOfficeGuard]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
