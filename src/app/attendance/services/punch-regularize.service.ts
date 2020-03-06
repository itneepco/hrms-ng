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

interface RegularizeApplication {
  rows: AttendRegApplication[];
  count: number;
}

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
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}`;
  }

  addPunchRegularize(attendReg: AttendRegForm) {
    return this.http
      .post(`${this.getUrl()}/attend-regularize`, attendReg)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  // Controlling officer - START
  fetchPendingRequest(
    empCode: string,
    pageIndex: number,
    pageSize: number
  ): Observable<RegularizeApplication> {
    return this.http
      .get<RegularizeApplication>(
        `${this.getUrl()}/attend-regularize/pending/${empCode}` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getPendingReqCount(empCode: string): Observable<number> {
    return this.http
      .get<number>(
        `${this.getUrl()}/attend-regularize/pending/${empCode}/count`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  fetchProcessedRequest(
    empCode: string,
    pageIndex: number,
    pageSize: number
  ): Observable<RegularizeApplication> {
    return this.http
      .get<RegularizeApplication>(
        `${this.getUrl()}/attend-regularize/processed/${empCode}` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  processRecommendWorkfow(id: number, workflow: WorkflowForm) {
    return this.http
      .post(`${this.getUrl()}/attend-regularize/${id}/workflow`, workflow)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  // Controlling officer - END

  // Time officer - START
  fetchApprovalRequest(
    pageIndex: number,
    pageSize: number
  ): Observable<RegularizeApplication> {
    return this.http
      .get<RegularizeApplication>(
        `${this.getUrl()}/time-officer/pending` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getApprovalReqCount(): Observable<number> {
    return this.http
      .get<number>(`${this.getUrl()}/time-officer/pending/count`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  fetchApprovedRejected(
    pageIndex: number,
    pageSize: number
  ): Observable<RegularizeApplication> {
    return this.http
      .get<RegularizeApplication>(
        `${this.getUrl()}/time-officer/processed` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  processApproveWorkflow(id: number, workflow: WorkflowForm) {
    return this.http
      .post(`${this.getUrl()}/time-officer/${id}/workflow`, workflow)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  // Time officer - END

  // Get employee punching details for a given date
  getMyPunchings(
    empCode: string,
    day?: string
  ): Observable<EmployeeAttendance> {
    return this.http
      .get<EmployeeAttendance>(
        `${this.getUrl()}/attend-regularize/my-punchings/${empCode}?day=${day}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  // Get mutual employee punching details for a given date
  getMutualPunchings(
    empCode: string,
    day?: string
  ): Observable<MutualEmployeeAttendance> {
    return this.http
      .get<MutualEmployeeAttendance>(
        `${this.getUrl()}/attend-regularize/mutual-punchings/${empCode}?day=${day}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  // Get workflow status
  getStatus(status) {
    switch (status) {
      case APPLIED:
        return "APPLIED";
      case RECOMMENDED:
        return "RECOMMENDED";
      case APPROVED:
        return "APPROVED";
      case NOT_RECOMMENDED:
        return "NOT RECOMMENDED";
      case REJECTED:
        return "REJECTED";
      case CALLBACK:
        return "CALLBACKED";
    }
  }
}
