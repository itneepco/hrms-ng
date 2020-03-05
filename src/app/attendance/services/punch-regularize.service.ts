import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { baseURL } from "src/app/shared/config/baseUrl";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";
import {
  APPLIED,
  APPROVED,
  CALLBACK,
  NOT_RECOMMENDED,
  RECOMMENDED,
  REJECTED
} from "../models/attendance-codes";
import {
  AttendRegApplication,
  AttendRegForm,
  EmployeeAttendance,
  MutualEmployeeAttendance,
  WorkflowForm
} from "../models/attendance-regularize";

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
      `api/attendance/project/${this.auth.currentUser.project}`
    );
  }

  addPunchRegularize(attendReg: AttendRegForm) {
    return this.http
      .post(`${this.getUrl()}/attend-regularize`, attendReg)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  fetchPendingRequest(
    empCode: string,
    pageIndex: number,
    pageSize: number
  ): Observable<AttendRegApplication[]> {
    return this.http
      .get<AttendRegApplication[]>(
        `${this.getUrl()}/attend-regularize/pending/${empCode}` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  fetchApprovalRequest(
    pageIndex: number,
    pageSize: number
  ): Observable<AttendRegApplication[]> {
    return this.http
      .get<AttendRegApplication[]>(
        `${this.getUrl()}/time-officer/pending` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  fetchApprovedRejected(
    pageIndex: number,
    pageSize: number
  ): Observable<AttendRegApplication[]> {
    return this.http
      .get<AttendRegApplication[]>(
        `${this.getUrl()}/time-officer/processed` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  fetchProcessedRequest(
    empCode: string,
    pageIndex: number,
    pageSize: number
  ): Observable<AttendRegApplication[]> {
    return this.http
      .get<AttendRegApplication[]>(
        `${this.getUrl()}/attend-regularize/processed/${empCode}` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getMyPunchings(
    empCode: string,
    day?: string
  ): Observable<EmployeeAttendance> {
    return this.http
      .get<EmployeeAttendance>(
        `${this.getUrl()}/attend-regularize/my-punchings/${empCode}?day=${day}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
    // return of(my_punchings);
  }

  getMutualPunchings(
    empCode: string,
    day?: string
  ): Observable<MutualEmployeeAttendance> {
    return this.http
      .get<MutualEmployeeAttendance>(
        `${this.getUrl()}/attend-regularize/mutual-punchings/${empCode}?day=${day}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
    // return of(mutual_punchings)
  }

  processRecommendWorkfow(id: number, workflow: WorkflowForm) {
    return this.http
      .post(`${this.getUrl()}/attend-regularize/${id}/workflow`, workflow)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  procesApproveWorkflow(id: number, workflow: WorkflowForm) {
    return this.http
      .post(`${this.getUrl()}/time-officer/${id}/workflow`, workflow)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

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
