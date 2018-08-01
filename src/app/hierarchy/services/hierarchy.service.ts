import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EmployeeNode, TreeNode } from '../shared/employee-node';
import { baseURL } from './../../shared/config/baseUrl';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

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

  addChildNode(node: TreeNode) {

  }

  removeChildNode(node: TreeNode) {

  }

  deleteEmployeeNode(empCode: string) {

  }

  updateEmployeeNode(empNode: EmployeeNode) {

  }
}
