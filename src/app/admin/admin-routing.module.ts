import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../auth/services/admin-guard';
import { SuperAdminGuard } from '../auth/services/super-admin-guard';
import { AdminComponent } from './components/admin/admin.component';
import { HierarchyHomeComponent } from './components/hierarchy-home/hierarchy-home.component';
import { RoleMapperComponent } from './components/role-mapper/role-mapper.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children: [
      { 
        path: 'hierarchy', 
        component: HierarchyHomeComponent,
        canActivate: [AdminGuard] 
      },
      { 
        path: 'role-mapper', 
        component: RoleMapperComponent,
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
