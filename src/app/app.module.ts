import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter,
  MOMENT
} from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/moment";
import * as moment from "moment";
import { AdminModule } from "./admin/admin.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChangePasswordComponent } from "./auth/components/change-password/change-password.component";
import { JwtInterceptor } from "./auth/services/jwt-interceptor";
import { FooterComponent } from "./core/components/footer/footer.component";
import { HeaderComponent } from "./core/components/header/header.component";
import { SidenavComponent } from "./core/components/sidenav/sidenav.component";
import { LeaveModule } from "./leave/leave.module";
import { baseURL } from "./shared/config/baseUrl";
import { SharedModule } from "./shared/shared.module";
import { StatementModule } from "./statement/statement.module";
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    StatementModule,
    LeaveModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: momentAdapterFactory
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter
        }
      }
    )
  ],
  entryComponents: [ChangePasswordComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    { provide: "BaseURL", useValue: baseURL },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: MOMENT, useValue: moment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
