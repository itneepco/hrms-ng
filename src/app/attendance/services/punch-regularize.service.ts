import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { baseURL } from "src/app/shared/config/baseUrl";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";
import { APPLIED, APPROVED, CALLBACK, NOT_RECOMMENDED, RECOMMENDED, REJECTED } from "../models/attendance-codes";
import { AttendRegApplication, AttendRegForm, EmployeeAttendance } from "../models/attendance-regularize";
import { data, my_punchings, mutual_punchings } from "./data";

@Injectable({
  providedIn: "root"
})
export class PunchRegularizeService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) {}

  getUrl() {
    return (
      baseURL +
      `api/attendance/project/${this.auth.currentUser.project}/attend-regularize`
    );
  }

  addPunchRegularize(attendReg: AttendRegForm) {
    return this.http
      .post(`${this.getUrl()}`, attendReg)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  fetchPendingRequest(empCode: string): Observable<AttendRegApplication[]> {
    // return this.http
    //   .get<AttendRegApplication[]>(`${this.getUrl()}/pending/${empCode}`)
    //   .pipe(catchError(err => this.handler.handleError(err)));
    return of(data);
  }

  fetchProcessedRequest(empCode: string): Observable<AttendRegApplication[]> {
    // return this.http
    //   .get<AttendRegApplication[]>(`${this.getUrl()}/processed/${empCode}`)
    //   .pipe(catchError(err => this.handler.handleError(err)));
    return of(data);
  }

  getMyPunchings(empCode: string, day?: Date): Observable<EmployeeAttendance> {
    return of(my_punchings);
  }

  getMutualPunchings(empCode: string, day?: Date) {
    return of(mutual_punchings)
  }

  processWorkflow() {}

  getStatus(status) {
    switch (status) {
      case APPLIED:
        return "Applied";
      case RECOMMENDED:
        return "Recommended";
      case APPROVED:
        return "Approved";
      case NOT_RECOMMENDED:
        return "Not Recommended";
      case REJECTED:
        return "Rejected";
      case CALLBACK:
        return "Callbacked";
    }
  }
}
