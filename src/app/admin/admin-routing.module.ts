import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HierarchyHomeComponent } from './components/hierarchy-home/hierarchy-home.component';
import { RoleMapperComponent } from './components/role-mapper/role-mapper.component';

const routes: Routes = [
  { path: 'hierarchy', component: HierarchyHomeComponent },
  { path: 'role-mapper', component: RoleMapperComponent },
  { path: '', redirectTo: 'hierarchy', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
