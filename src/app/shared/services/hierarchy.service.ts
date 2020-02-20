import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../config/baseUrl';
import { EmployeeNode, Hierarchy, TreeNode } from '../models/employee-node';
import { ErrorHandlerService } from './error-handler.service';
import { CtrlOfficer } from '../models/adressee';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {
  hierarchyUrl = baseURL + 'api/hierarchy/'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  getEmployeeNode(empCode: string): Observable<EmployeeNode | any> {
    return this.http.get(this.hierarchyUrl + empCode)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  searchEmployee(empCode: string): Observable<TreeNode | any> {
    return this.http.get(baseURL + 'api/employees/' + empCode)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addChildNode(hierarchyNode: Hierarchy) {
    return this.http.post(this.hierarchyUrl + hierarchyNode.emp_code, hierarchyNode)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  removeChildNode(id: number) {
    return this.http.delete(this.hierarchyUrl + id)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getParents(empCode: string): Observable<CtrlOfficer[]> {
    return this.http.get<CtrlOfficer[]>(this.hierarchyUrl + 'parents/' + empCode)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
