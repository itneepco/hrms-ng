import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AddChildNodeComponent } from './components/add-child-node/add-child-node.component';
import { HierarchyHomeComponent } from './components/hierarchy-home/hierarchy-home.component';
import { HierarchyComponent } from './components/hierarchy/hierarchy.component';
import { NodeInfoComponent } from './components/node-info/node-info.component';
import { HierarchyRoutingModule } from './hierarchy-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HierarchyRoutingModule
  ],
  declarations: [
    HierarchyComponent,
    HierarchyHomeComponent,
    AddChildNodeComponent,
    NodeInfoComponent,
  ],
  entryComponents: [
    AddChildNodeComponent
  ]
})
export class HierarchyModule { }
