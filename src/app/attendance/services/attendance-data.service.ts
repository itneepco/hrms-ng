import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";
import { baseURL } from "./../../shared/config/baseUrl";

@Injectable({
  providedIn: "root"
})
export class AttendanceDataService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) {}

  getUrl() {
    return (
      baseURL +
      `api/attendance/project/${this.auth.currentUser.project}/attendance-data`
    );
  }

  insertPunchingRec(filenames: string[]) {
    return this.http
      .post(`${this.getUrl()}/insert`, filenames)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
