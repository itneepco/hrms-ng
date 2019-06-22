import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AddChildNodeComponent } from './components/add-child-node/add-child-node.component';
import { AddLedgerComponent } from './components/add-ledger/add-ledger.component';
import { AdminComponent } from './components/admin/admin.component';
import { HierarchyHomeComponent } from './components/hierarchy-home/hierarchy-home.component';
import { HolidayListComponent } from './components/holiday-list/holiday-list.component';
import { LeaveCreditComponent } from './components/leave-credit/leave-credit.component';
import { LeaveLedgerComponent } from './components/leave-ledger/leave-ledger.component';
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
    HolidayListComponent,
    LeaveLedgerComponent,
    AddLedgerComponent,
    LeaveCreditComponent,
  ],
  entryComponents: [
    AddChildNodeComponent,
    AddLedgerComponent,
  ]
})
export class AdminModule { }
