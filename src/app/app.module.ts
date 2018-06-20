import { MenuService } from './core/services/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material/app-material.module';
import { AppRouterModule } from './app-router/app-router.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthService } from './auth/services/auth.service';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { SubheaderComponent } from './core/components/subheader/subheader.component';
import { HierarchyHomeComponent } from './hierarchy/components/hierarchy-home/hierarchy-home.component';
import { HierarchyTreeComponent } from './hierarchy/components/hierarchy-tree/hierarchy-tree.component';
import { HierarchyComponent } from './hierarchy/components/hierarchy/hierarchy.component';
import { ApplyLeaveComponent } from './leave/apply-leave/apply-leave.component';
import { LeaveListComponent } from './leave/leave-list/leave-list.component';
import { LeaveTransactionComponent } from './leave/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './leave/leave/leave.component';
import { ArchivedComponent } from './training/archived/archived.component';
import { FeedbackComponent } from './training/feedback/feedback.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { TrainingComponent } from './training/training/training.component';
import { UpcomingComponent } from './training/upcoming/upcoming.component';
import { HierarchyService } from './hierarchy/services/hierarchy.service';
import { AddChildNodeComponent } from './hierarchy/components/add-child-node/add-child-node.component';

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
    AddChildNodeComponent
  ],
  entryComponents: [
    AddChildNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRouterModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    MenuService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
