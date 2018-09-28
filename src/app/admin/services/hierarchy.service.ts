import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EmployeeNode, TreeNode } from '../shared/employee-node';
import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Hierarchy } from '../shared/employee-node';

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
    return this.http.get(baseURL + 'api/employees/hierarchy/' + empCode)
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

  getParents(empCode: string) {
    return this.http.get(this.hierarchyUrl + 'parents/' + empCode)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}