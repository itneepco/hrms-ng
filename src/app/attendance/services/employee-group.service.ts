import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { EmployeeGroup } from '../models/employee-group';

@Injectable()
export class EmployeeGroupService {

  constructor(private http: HttpClient,
    private handler: ErrorHandlerService) {
  }

  getUrl() {
    return baseURL + 'api/attendance/group'
  }

  getEmployeeGroups(groupId: number): Observable<EmployeeGroup[]> {
    return this.http.get<EmployeeGroup[]>(`${this.getUrl()}/${groupId}/employees`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addEmployeeGroup(groupId: number, shift: EmployeeGroup) {
    return this.http.post(`${this.getUrl()}/${groupId}/employees`, shift)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editEmployeeGroup(groupId: number, id: number, shift: EmployeeGroup) {
    return this.http.put(`${this.getUrl()}/${groupId}/employees/${id}`, shift)
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
