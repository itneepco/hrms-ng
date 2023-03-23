import { ManageAttendanceComponent } from "./components/manage-attendance/manage-attendance.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminGuard } from "../auth/services/admin-guard";
import { AuthGuard } from "../auth/services/auth-guard";
import { ApprovedLeavesComponent } from "./components/approved-leaves/approved-leaves.component";
import { PensionStatementComponent } from "./components/pension-statement/pension-statement.component";
import { PfStatementComponent } from "./components/pf-statement/pf-statement.component";
import { SalaryStatementComponent } from "./components/salary-statement/salary-statement.component";
import { StatementComponent } from "./components/statement/statement.component";
import { TimeOfficeGuard } from "../auth/services/time-office-guard";
import { PfAdminComponent } from "./components/pf-admin/pf-admin.component";
import { TrainingAdminGuard } from "../auth/services/training-admin-guard";

const routes: Routes = [
  {
    path: "",
    component: StatementComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: "salary", component: SalaryStatementComponent },
      {
        path: "approved-leaves",
        component: ApprovedLeavesComponent,
        canActivate: [TimeOfficeGuard],
      },
      { path: "pf", component: PfStatementComponent },
      {
        path: "pfAdmin",
        component: PfAdminComponent,
        canActivate: [TrainingAdminGuard],
      },
      { path: "pension", component: PensionStatementComponent },
      { path: "", redirectTo: "pf", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatementRoutingModule {}
