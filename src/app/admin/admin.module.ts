import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AddChildNodeComponent } from './components/add-child-node/add-child-node.component';
import { AdminComponent } from './components/admin/admin.component';
import { HierarchyHomeComponent } from './components/hierarchy-home/hierarchy-home.component';
import { NodeInfoComponent } from './components/node-info/node-info.component';
import { RoleMapperComponent } from './components/role-mapper/role-mapper.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    HierarchyHomeComponent,
    AddChildNodeComponent,
    NodeInfoComponent,
    RoleMapperComponent,
  ],
  entryComponents: [
    AddChildNodeComponent
  ]
})
export class AdminModule { }
