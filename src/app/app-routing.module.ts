import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { AdminGuard } from './auth/services/admin-guard';
import { AuthGuard } from './auth/services/auth-guard';
import { LoginGuard } from './auth/services/login-guard';

const routes: Routes = [
  {
    path: 'administrator',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: 'statements',
    canActivate: [AuthGuard],
    loadChildren: 'app/statement/statement.module#StatementModule'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'leave',
    canActivate: [AuthGuard],
    loadChildren: 'app/leave/leave.module#LeaveModule'
  },
  {
    path: 'training',
    canActivate: [AuthGuard],
    loadChildren: 'app/training/training.module#TrainingModule'
  },
  {
    path: 'report',
    canActivate: [AuthGuard],
    loadChildren: 'app/report/report.module#ReportModule'
  },
  { path: '', redirectTo: '/leave/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/leave/dashboard', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
