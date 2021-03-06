import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";
import { AuthService } from "./../../auth/services/auth.service";
import { baseURL } from "./../../shared/config/baseUrl";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GraphDashboardService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) {}

  getUrl() {
    return (
      baseURL +
      `api/attendance/project/${this.auth.currentUser.project}/graph-dashboard`
    );
  }

  getAttendanceStats(day?: string): Observable<any> {
    let url = `${this.getUrl()}/status`;
    if (day) {
      url = `${this.getUrl()}/status?day=${day}`;
    }
    return this.http.get<any>(url)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
