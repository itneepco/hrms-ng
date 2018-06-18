import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material/app-material.module';
import { AppRouterModule } from './app-router/app-router.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginComponent } from './core/components/login/login.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { SubheaderComponent } from './core/components/subheader/subheader.component';
import { AuthService } from './core/services/auth.service';
import { MenuService } from './core/services/menu.service';
import { ApplyLeaveComponent } from './leave/apply-leave/apply-leave.component';
import { LeaveListComponent } from './leave/leave-list/leave-list.component';
import { LeaveTransactionComponent } from './leave/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './leave/leave/leave.component';
import { ArchivedComponent } from './training/archived/archived.component';
import { FeedbackComponent } from './training/feedback/feedback.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { TrainingComponent } from './training/training/training.component';
import { UpcomingComponent } from './training/upcoming/upcoming.component';
import { HierarchyComponent } from './hierarchy/hierarchy/hierarchy.component';

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
    HierarchyComponent
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
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
