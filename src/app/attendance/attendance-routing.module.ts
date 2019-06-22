import { ShiftComponent } from './components/admin/shift/shift.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth-guard';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TimeOfficeGuard } from '../auth/services/time-office-guard';
import { GroupComponent } from './components/admin/group/group.component';

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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
