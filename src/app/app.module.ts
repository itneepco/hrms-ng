import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { AppMaterialModule } from './app-material/app-material.module';
import { AppRouterModule } from './app-router/app-router.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { JwtInterceptor } from './auth/services/jwt-interceptor';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { SubheaderComponent } from './core/components/subheader/subheader.component';
import { MenuService } from './core/services/menu.service';
import { AddChildNodeComponent } from './hierarchy/components/add-child-node/add-child-node.component';
import { HierarchyHomeComponent } from './hierarchy/components/hierarchy-home/hierarchy-home.component';
import { HierarchyTreeComponent } from './hierarchy/components/hierarchy-tree/hierarchy-tree.component';
import { HierarchyComponent } from './hierarchy/components/hierarchy/hierarchy.component';
import { NodeInfoComponent } from './hierarchy/components/node-info/node-info.component';
import { AddLedgerComponent } from './leave/components/add-ledger/add-ledger.component';
import { ApplyLeaveComponent } from './leave/components/apply-leave/apply-leave.component';
import { HolidayListComponent } from './leave/components/holiday-list/holiday-list.component';
import { LeaveListComponent } from './leave/components/leave-list/leave-list.component';
import { LeaveTransactionComponent } from './leave/components/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './leave/components/leave/leave.component';
import { LedgerComponent } from './leave/components/ledger/ledger.component';
import { baseURL } from './shared/config/baseUrl';
import { ArchivedComponent } from './training/archived/archived.component';
import { FeedbackComponent } from './training/feedback/feedback.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { TrainingComponent } from './training/training/training.component';
import { UpcomingComponent } from './training/upcoming/upcoming.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    ApplyLeaveComponent,
    LeaveTransactionComponent,
    LeaveListComponent,
    NewTrainingComponent,
    SubheaderComponent,
    LeaveComponent,
    TrainingComponent,
    ArchivedComponent,
    UpcomingComponent,
    FeedbackComponent,
    LoginComponent,
    HierarchyComponent,
    HierarchyHomeComponent,
    HierarchyTreeComponent,
    AddChildNodeComponent,
    NodeInfoComponent,
    HolidayListComponent,
    LedgerComponent,
    AddLedgerComponent
  ],
  entryComponents: [
    AddChildNodeComponent,
    AddLedgerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRouterModule,
    FlexLayoutModule,
    HttpClientModule,
    CalendarModule.forRoot()
  ],
  providers: [
    MenuService,
    { provide: "BaseURL", useValue: baseURL },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
