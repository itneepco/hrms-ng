import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { baseURL } from "src/app/shared/config/baseUrl";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";
import { Employee } from "./../../shared/models/employee";
import { EmployeeGroupDtl, EmployeeGroupForm } from "./../models/employee-group";

@Injectable({
  providedIn: "root"
})
export class EmployeeGroupService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) {}

  getUrl() {
    return (
      baseURL +
      `api/attendance/project/${this.auth.currentUser.project}/emp-group`
    );
  }

  getExemptedEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${this.getUrl()}/exempted-list`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getEmployeeGroups(groupId: number): Observable<EmployeeGroupDtl[]> {
    return this.http
      .get<EmployeeGroupDtl[]>(`${this.getUrl()}/group/${groupId}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  addEmployeeGroup(empGroup: EmployeeGroupForm): Observable<EmployeeGroupDtl> {
    return this.http
      .post<EmployeeGroupDtl>(`${this.getUrl()}/new`, empGroup)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  editEmployeeGroup(
    id: number,
    empGroup: EmployeeGroupForm
  ): Observable<EmployeeGroupDtl> {
    return this.http
      .put<EmployeeGroupDtl>(`${this.getUrl()}/${id}`, empGroup)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  deleteEmployeeGroup(id: number) {
    return this.http
      .delete(`${this.getUrl()}/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getEmployeeGroup(id: number): Observable<EmployeeGroupDtl> {
    return this.http
      .get<EmployeeGroupDtl>(`${this.getUrl()}/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
