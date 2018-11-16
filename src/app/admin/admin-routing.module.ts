import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../auth/services/admin-guard';
import { AuthGuard } from '../auth/services/auth-guard';
import { SuperAdminGuard } from '../auth/services/super-admin-guard';
import { AdminComponent } from './components/admin/admin.component';
import { HierarchyHomeComponent } from './components/hierarchy-home/hierarchy-home.component';
import { HolidayListComponent } from './components/holiday-list/holiday-list.component';
import { LeaveLedgerComponent } from './components/leave-ledger/leave-ledger.component';
import { RoleMapperComponent } from './components/role-mapper/role-mapper.component';
import { LeaveCreditComponent } from './components/leave-credit/leave-credit.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    children: [
      { 
        path: 'hierarchy', 
        component: HierarchyHomeComponent,
        canActivate: [AdminGuard] 
      },
      { 
        path: 'holiday-list', 
        component: HolidayListComponent,
        canActivate: [AdminGuard] 
      },
      { 
        path: 'leave-ledger', 
        component: LeaveLedgerComponent,
        canActivate: [AdminGuard] 
      },
      { 
        path: 'role-mapper', 
        component: RoleMapperComponent,
        canActivate: [SuperAdminGuard] 
      },
      { 
        path: 'leave-credit', 
        component: LeaveCreditComponent,
        canActivate: [SuperAdminGuard] 
      },
      { path: '', redirectTo: 'hierarchy', pathMatch: 'full' }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
