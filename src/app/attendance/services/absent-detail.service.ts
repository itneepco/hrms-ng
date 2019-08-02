import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { baseURL } from "src/app/shared/config/baseUrl";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";

import { AbsentDetail } from "./../models/absent-dtl";

@Injectable({
  providedIn: "root"
})
export class AbsentDetailService {
  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getUrl() {
    return baseURL + `api/attendance/employee`;
  }

  getAbsentDtls(
    empCode: string,
    pageIndex: number,
    pageSize: number
  ): Observable<AbsentDetail[]> {
    return this.http
      .get<AbsentDetail[]>(
        `${this.getUrl()}/${empCode}/absent-detail?pageIndex=${pageIndex}&pageSize=${pageSize}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  addAbsentDtl(empCode: string, absentDtl: AbsentDetail) {
    return this.http
      .post(`${this.getUrl()}/${empCode}/absent-detail`, absentDtl)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  editAbsentDtl(empCode: string, id: number, absentDtl: AbsentDetail) {
    return this.http
      .put(`${this.getUrl()}/${empCode}/absent-detail/${id}`, absentDtl)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  deleteAbsentDtl(empCode: string, id: number) {
    return this.http
      .delete(`${this.getUrl()}/${empCode}/absent-detail/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
