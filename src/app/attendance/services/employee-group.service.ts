import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { EmployeeGroup } from '../models/employee-group';
import { EmployeeGroupDtl, EmployeeGroupForm } from './../models/employee-group';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGroupService {

  constructor(private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService) {
  }

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}/group`
  }

  getEmployeeGroups(groupId: number): Observable<EmployeeGroupDtl[]> {
    return this.http.get<EmployeeGroupDtl[]>(`${this.getUrl()}/${groupId}/employees`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addEmployeeGroup(groupId: number, empGroup: EmployeeGroupForm) {
    return this.http.post(`${this.getUrl()}/${groupId}/employees`, empGroup)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editEmployeeGroup(groupId: number, id: number, empGroup: EmployeeGroupForm) {
    return this.http.put(`${this.getUrl()}/${groupId}/employees/${id}`, empGroup)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteEmployeeGroup(groupId: number, id: number) {
    return this.http.delete(`${this.getUrl()}/${groupId}/employees/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getEmployeeGroup(groupId: number, id: number) {
    return this.http.get<EmployeeGroup>(`${this.getUrl()}/${groupId}/employees/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
