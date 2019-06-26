import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../config/baseUrl';
import { Employee } from '../models/employee';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  searchEmployee(empCode: string): Observable<Employee | any> {
    return this.http.get(baseURL + 'api/employees/search?emp_code=' + empCode)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  searchEmployeeByName(empName: string): Observable<Employee | any> {
    return this.http.get(baseURL + 'api/employees/search?name=' + empName)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getFullName(item: Employee) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${
      item.emp_code
    }, ${item.designation}`;
  }
}
