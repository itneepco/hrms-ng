import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class JoiningReportService {
  url = baseURL + "api/joining-report"

  constructor(private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  getJoiningReport(empCode: string): Observable<any> {
    return this.http.get(`${this.url}/${empCode}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      )
  }
}
