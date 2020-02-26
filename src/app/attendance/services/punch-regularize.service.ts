import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/auth/services/auth.service";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";
import { baseURL } from "src/app/shared/config/baseUrl";
import {
  AttendRegForm,
  AttendRegApplication
} from "../models/attendance-regularize";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import {
  CALLBACK,
  REJECTED,
  NOT_RECOMMENDED,
  APPROVED,
  RECOMMENDED,
  APPLIED
} from "../models/attendance-codes";

const data = [
  {
    id: 1,
    day: "2020-02-10",
    status: "01",
    applier: {
      emp_code: "006584",
      full_name: "Biplab Bharali",
      designation: "Assistant I"
    },
    isMutual: true,
    applicationHistory: [
      {
        id: 1,
        officer: {
          emp_code: "006368",
          full_name: "Nepuni Pfotte",
          designation: "Deputy Manager"
        },
        workflow_action: "01",
        remarks: "Applied",
        updated_at: ""
      }
    ],
    reason: "Forgot to punch"
  }
];

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

  getStatus(status) {
    switch (status) {
      case APPLIED:
        return "Applied"
      case RECOMMENDED:
        return "Recommended"
      case APPROVED:
        return "Approved"
      case NOT_RECOMMENDED:
        return "Not Recommended"
      case REJECTED:
        return "Rejected"
      case CALLBACK:
        return "Callbacked"
    }
  }
}
