import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenteeStatementService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) { }

  getUrl() {
    return (
      baseURL +
      `api/attendance/project/${this.auth.currentUser.project}/month-end`
    );
  }

  getAbsenteeStatement(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.getUrl()}/absentee-statement`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  processMonthEnd(): Observable<any> {
    return this.http
      .get<any>(`${this.getUrl()}/close`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
