import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { baseURL } from '../config/baseUrl';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

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
}
