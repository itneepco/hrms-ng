import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./auth/components/login/login.component";
import { AdminGuard } from "./auth/services/admin-guard";
import { AuthGuard } from "./auth/services/auth-guard";
import { LoginGuard } from "./auth/services/login-guard";

const routes: Routes = [
  {
    path: "administrator",
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "statements",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./statement/statement.module").then(m => m.StatementModule)
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "leave",
    canActivate: [AuthGuard],
    loadChildren: () => import("./leave/leave.module").then(m => m.LeaveModule)
  },
  {
    path: "training",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./training-module/training.module").then(m => m.TrainingModule)
  },
  {
    path: "attendance",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./attendance/attendance.module").then(m => m.AttendanceModule)
  },
  { path: "", redirectTo: "/leave/dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "/leave/dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
