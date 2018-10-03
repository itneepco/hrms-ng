import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { JwtInterceptor } from './auth/services/jwt-interceptor';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { MenuService } from './core/services/menu.service';
import { ApplyCLRHComponent } from './leave/components/apply-clrh/apply-clrh.component';
import { ApplyLeaveComponent } from './leave/components/apply-leave/apply-leave.component';
import { LeaveDashboardComponent } from './leave/components/leave-dashboard/leave-dashboard.component';
import { LeaveDetailComponent } from './leave/components/leave-detail/leave-detail.component';
import { LeaveMenuComponent } from './leave/components/leave-menu/leave-menu.component';
import { LeaveRequestComponent } from './leave/components/leave-request/leave-request.component';
import { LeaveTableComponent } from './leave/components/leave-table/leave-table.component';
import { LeaveTransactionComponent } from './leave/components/leave-transaction/leave-transaction.component';
import { LeaveComponent } from './leave/components/leave/leave.component';
import { ProcessedRequestComponent } from './leave/components/processed-request/processed-request.component';
import { baseURL } from './shared/config/baseUrl';
import { SharedModule } from './shared/shared.module';
import { StatementModule } from './statement/statement.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    LeaveTransactionComponent,
    ApplyCLRHComponent,
    LoginComponent,
    LeaveMenuComponent,
    LeaveDetailComponent,
    LeaveRequestComponent,
    LeaveTableComponent,
    LeaveComponent,
    ProcessedRequestComponent,
    LeaveDashboardComponent,
    ApplyLeaveComponent,
  ],
  entryComponents: [
    LeaveMenuComponent,
    LeaveDetailComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    StatementModule,
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
